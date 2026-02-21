import { MaterialIcons } from "@expo/vector-icons";
import { deviceName } from "expo-device";
import { File, Paths } from "expo-file-system";
import * as FileSystemLegacy from "expo-file-system/legacy";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import * as SQLite from "expo-sqlite";
import * as TaskManager from "expo-task-manager";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Image, ScrollView, View } from "react-native";
import { Header } from "@/components/shared/header";
import { Report, type ReportType } from "@/components/shared/report";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { checkAndRequestPermission } from "../lib/permissions";
import { createMeshSync } from "../lib/sync-mesh";

const db = SQLite.openDatabaseSync("mesh.db");
const BACKGROUND_SYNC_TASK = "BACKGROUND_SYNC_TASK";

TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
  console.log("[BackgroundSync] Heartbeat");
});

export default function Reports() {
  const [ready, setReady] = useState(false);

  const [reports, setReports] = useState<ReportType[]>([]);
  const reportsRef = useRef<ReportType[]>([]);
  const meshRef = useRef<ReturnType<typeof createMeshSync> | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [deviceId] = useState(() => {
    const raw = deviceName || "UnknownDevice";
    const safe = raw.replace(/[^a-zA-Z0-9]/g, "");
    return `${safe}-${Math.random().toString(36).slice(2, 6)}`;
  });

  // ---------------- DB INIT ----------------

  const loadReports = useCallback(() => {
    const data = db.getAllSync<ReportType>(
      "SELECT * FROM reports ORDER BY createdAt DESC",
    );
    reportsRef.current = data;
    setReports(data);
  }, []);

  useEffect(() => {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT,
        description TEXT,
        imageUri TEXT,
        createdAt INTEGER,
        deviceId TEXT,
        latitude REAL,
        longitude REAL
      );
    `);

    loadReports();
  }, [loadReports]);

  const insertReport = (r: ReportType) => {
    db.runSync(
      `INSERT OR IGNORE INTO reports VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        r.id,
        r.title,
        r.description,
        r.imageUri,
        r.createdAt,
        r.deviceId,
        r.latitude ?? null,
        r.longitude ?? null,
      ],
    );
    // Reload from DB to ensure refs and state are perfectly aligned (like in testing code)
    loadReports();
  };

  const updateReportImage = (id: string, uri: string) => {
    db.runSync(`UPDATE reports SET imageUri = ? WHERE id = ?`, [uri, id]);
    loadReports();
  };

  const deleteAllReports = async () => {
    try {
      // Delete image files first (optional but recommended)
      for (const r of reportsRef.current) {
        if (r.imageUri) {
          try {
            await FileSystemLegacy.deleteAsync(r.imageUri, {
              idempotent: true,
            });
          } catch {}
        }
      }

      // Clear database
      db.execSync(`DELETE FROM reports;`);

      // Refresh UI state completely
      loadReports();

      // Restart the mesh so it re-handshakes with peers using the now-empty
      // ID list — they'll see we're missing everything and re-send it all
      if (meshRef.current) {
        meshRef.current.stop();
        meshRef.current.start();
      }

      Alert.alert("All data deleted");
    } catch (err) {
      console.error("Delete failed", err);
      Alert.alert("Failed to delete data");
    }
  };

  // ---------------- PERMISSIONS ----------------

  useEffect(() => {
    (async () => {
      const ok = await checkAndRequestPermission();
      if (!ok) return Alert.alert("Permissions required");

      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
      await Location.requestBackgroundPermissionsAsync();

      const hasStarted =
        await Location.hasStartedLocationUpdatesAsync(BACKGROUND_SYNC_TASK);

      if (!hasStarted) {
        await Location.startLocationUpdatesAsync(BACKGROUND_SYNC_TASK, {
          accuracy: Location.Accuracy.Low,
          timeInterval: 15000,
          distanceInterval: 0,
          foregroundService: {
            notificationTitle: "Mesh Sync Active",
            notificationBody: "Syncing reports in background",
            notificationColor: "#0000FF",
          },
        }).catch(() => {});
      }

      setReady(true);
    })();
  }, []);

  // ---------------- IMAGE ----------------

  const openCamera = async () => {
    const res = await ImagePicker.launchCameraAsync({
      quality: 0.5,
      base64: false,
    });

    if (!res.canceled) {
      const ctx = ImageManipulator.manipulate(res.assets[0].uri).resize({
        width: 800,
      });
      const rendered = await ctx.renderAsync();
      const result = await rendered.saveAsync({
        format: SaveFormat.JPEG,
        compress: 0.3,
      });
      setImageUri(result.uri);
    }
  };

  // ---------------- CREATE REPORT ----------------

  const createReport = async () => {
    if (!title || !description || !imageUri)
      return Alert.alert("Fill all fields");

    const id = `${deviceId}-${Date.now()}`;

    let coords = { latitude: 0, longitude: 0 };

    try {
      const loc = await Location.getLastKnownPositionAsync();
      coords = loc?.coords ?? { latitude: 0, longitude: 0 };
    } catch {}

    insertReport({
      id,
      title,
      description,
      imageUri,
      createdAt: Date.now(),
      deviceId,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    setTitle("");
    setDescription("");
    setImageUri(null);
  };

  // ---------------- MESH SYNC ----------------

  useEffect(() => {
    if (!ready) return;

    const reportsAdapter = {
      name: "reports",
      getIds: () => reportsRef.current.map((r) => r.id),
      getById: async (id: string) =>
        reportsRef.current.find((r) => r.id === id),
      insertMeta: (data: ReportType) => {
        // Must wipe incoming remote URI path so we don't try loading it before binary arrives
        insertReport({ ...data, imageUri: "" });
      },
      updateBinary: async (id: string, base64: string) => {
        const file = new File(Paths.document, id + ".jpg");

        await FileSystemLegacy.writeAsStringAsync(file.uri, base64, {
          encoding: FileSystemLegacy.EncodingType.Base64,
        });

        updateReportImage(id, file.uri);
      },
    };

    const mesh = createMeshSync({
      deviceId,
      serviceId: "ReportApp",
      entities: [reportsAdapter],
    });

    meshRef.current = mesh;
    mesh.start();

    return () => mesh.stop();
  }, [ready, deviceId]);

  // ---------------- UI ----------------

  if (!ready)
    return <Text style={{ padding: 32 }}>Waiting for permissions...</Text>;

  return (
    <>
      <Stack.Screen options={{ header: () => <Header title="My Reports" /> }} />

      <ScrollView
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 20,
          paddingBottom: 40,
        }}
      >
        {/* DAILY LIMIT UI */}
        <View className="flex h-[100px] w-full flex-col items-start justify-center gap-3 rounded-lg border border-border bg-card p-3">
          <View className="flex w-full flex-row items-center justify-between">
            <Text className="font-medium">Daily Limit</Text>
            <View className="rounded-lg bg-primary/10 px-2 py-1">
              <Text className="text-primary text-xs">
                {reports.length} of 4 used
              </Text>
            </View>
          </View>

          <View className="flex h-3 w-full rounded-lg bg-background">
            <View
              className="flex h-full rounded-lg bg-primary"
              style={{ width: `${(reports.length / 4) * 100}%` }}
            />
          </View>

          <Text variant="muted" className="text-xs">
            Resets in 4 hours 12 minutes
          </Text>
        </View>

        {/* CREATE REPORT DIALOG */}
        <AlertDialog className="w-full">
          <AlertDialogTrigger asChild>
            <Button className="h-fit w-full py-3">
              <MaterialIcons name="add-circle" size={18} color="white" />
              <Text>Create New Report</Text>
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="w-full">
            <AlertDialogHeader>
              <AlertDialogTitle>Create Report</AlertDialogTitle>
              <AlertDialogDescription>
                Create a new report on things around your surroundings
              </AlertDialogDescription>
            </AlertDialogHeader>

            <View className="flex flex-col gap-3">
              <View className="flex flex-col items-start justify-center gap-2">
                <Text className="text-muted-foreground text-sm">
                  Report Name
                </Text>
                <Input
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter title"
                />
              </View>

              <View className="flex flex-col items-start justify-center gap-2">
                <Text className="text-muted-foreground text-sm">
                  Report Description
                </Text>
                <Input
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Enter description"
                />
              </View>

              <View className="flex flex-col items-start justify-center gap-2">
                <Text className="text-muted-foreground text-sm">
                  Report Image
                </Text>

                <Button className="w-full bg-primary/40" onPress={openCamera}>
                  <MaterialIcons
                    name="camera-enhance"
                    size={18}
                    color="white"
                  />
                  <Text>Open Camera</Text>
                </Button>

                {imageUri && (
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: 80, height: 80, marginTop: 8 }}
                  />
                )}
              </View>
            </View>

            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>

              <AlertDialogAction onPress={createReport}>
                <Text>Create</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* ACTIVE REPORTS */}
        <View className="flex w-full flex-col gap-4">
          <Text variant="muted" className="font-medium">
            ACTIVE REPORTS
          </Text>

          {reports.map((r) => (
            <Report key={r.id} report={r} />
          ))}
        </View>

        <Button variant={"destructive"} onPress={deleteAllReports}>
          <Text>Delete All Reports</Text>
        </Button>
      </ScrollView>
    </>
  );
}
