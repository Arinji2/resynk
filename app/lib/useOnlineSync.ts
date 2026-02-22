import NetInfo from "@react-native-community/netinfo";
import * as FileSystem from "expo-file-system";
import * as Notifications from "expo-notifications";
import * as SQLite from "expo-sqlite";
import { useEffect, useRef } from "react";
import type { ReportType } from "@/components/shared/report";
import { useUserProfile } from "@/lib/useUserProfile";

const db = SQLite.openDatabaseSync("mesh.db");

export function useOnlineSync() {
  const { user } = useUserProfile();

  const wasOfflineRef = useRef(false);
  const debounceTimerRef = useRef<number | null>(null);
  const isSyncingRef = useRef(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online =
        state.isConnected === true && state.isInternetReachable !== false;

      // If connection regained
      if (online && wasOfflineRef.current) {
        console.log("[OnlineSync] Online detected — waiting to debounce");

        // Clear existing timer if any
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        // Wait 3 seconds before syncing
        debounceTimerRef.current = setTimeout(async () => {
          if (isSyncingRef.current) return;

          isSyncingRef.current = true;

          console.log("[OnlineSync] Debounce passed — syncing");

          try {
            const reports = db.getAllSync<ReportType>(
              "SELECT * FROM reports ORDER BY createdAt DESC",
            );

            const reportsWithBase64 = await Promise.all(
              reports.map(async (r) => {
                let imageBase64 = "";

                if (r.imageUri?.startsWith("file://")) {
                  const base64 = await FileSystem.readAsStringAsync(
                    r.imageUri,
                    {
                      encoding: "base64",
                    },
                  );

                  imageBase64 = `data:image/jpeg;base64,${base64}`;
                }

                return {
                  id: r.id,
                  title: r.title,
                  description: r.description,
                  imageUri: imageBase64,
                  createdAt: r.createdAt,
                  latitude: r.latitude,
                  longitude: r.longitude,
                  meshSyncID: r.meshSyncId,
                };
              }),
            );

            const payload = {
              user: {
                name: user?.name,
                role: user?.role,
                age: user?.age,
                aadharNumber: user?.aadharNumber,
                allergies: user?.allergies,
                medications: user?.medications,
                bloodGroup: user?.bloodGroup,
              },
              reports: reportsWithBase64,
            };

            const res = await fetch("https://your-api.com/sync", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Server error");

            console.log("[OnlineSync] Sync success");

            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Sync Complete",
                body: `${reports.length} reports uploaded successfully.`,
              },
              trigger: null,
            });
          } catch (err) {
            console.log("[OnlineSync] Sync failed", err);
          } finally {
            isSyncingRef.current = false;
          }
        }, 3000);
      }

      // If connection lost again → cancel debounce
      if (!online && debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }

      wasOfflineRef.current = !online;
    });

    return () => {
      unsubscribe();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [user]);
}
