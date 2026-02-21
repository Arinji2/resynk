import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as FileSystemLegacy from "expo-file-system/legacy";
import { Stack } from "expo-router";
import * as SQLite from "expo-sqlite";
import { Alert, ScrollView, View } from "react-native";

import { Header } from "@/components/shared/header";
import type { ReportType } from "@/components/shared/report";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { THEME } from "@/lib/theme";

const db = SQLite.openDatabaseSync("mesh.db");

export default function Settings() {
  const handleClearData = async () => {
    Alert.alert(
      "Clear All Local Data",
      "This will permanently delete all locally stored reports and images. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Get all reports first
              const reports = db.getAllSync<ReportType>(
                "SELECT * FROM reports",
              );

              // Delete images from filesystem
              for (const r of reports) {
                if (r.imageUri) {
                  try {
                    await FileSystemLegacy.deleteAsync(r.imageUri, {
                      idempotent: true,
                    });
                  } catch {}
                }
              }

              // Clear DB
              db.execSync("DELETE FROM reports;");

              Alert.alert("Success", "All local data cleared.");
            } catch (err) {
              console.log("Clear failed", err);
              Alert.alert("Error", "Failed to clear local data.");
            }
          },
        },
      ],
    );
  };

  return (
    <>
      <Stack.Screen options={{ header: () => <Header title="Settings" /> }} />

      <ScrollView
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 100,
          gap: 32,
        }}
        className="px-4"
      >
        {/* ---------------- APP PREFERENCES ---------------- */}
        <View>
          <Text className="mb-3 ml-1 font-bold text-muted-foreground text-sm uppercase tracking-wider">
            App Preferences
          </Text>

          <View className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3">
                <View className="flex size-9 items-center justify-center rounded-full bg-muted">
                  <MaterialIcons
                    name="language"
                    size={20}
                    color={THEME["muted-foreground"]}
                  />
                </View>
                <Text className="font-semibold text-sm">Language</Text>
              </View>

              <View className="flex-row items-center gap-2">
                <Text className="font-medium text-muted-foreground text-xs">
                  English
                </Text>
                <MaterialIcons
                  name="chevron-right"
                  size={18}
                  color={THEME["muted-foreground"]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* ---------------- CLEAR DATA ---------------- */}
        <View className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="border-red-200"
            onPress={handleClearData}
          >
            <MaterialIcons name="delete-forever" size={20} color="#dc2626" />
            <Text className="font-semibold text-red-600">
              Clear All Local Data
            </Text>
          </Button>

          <Text className="px-2 text-center text-[10px] text-muted-foreground leading-relaxed">
            This will remove all locally cached reports and notices. Your
            account status will remain active on the server.
          </Text>
        </View>

        {/* ---------------- VERSION INFO ---------------- */}
        <View className="items-center gap-1 pb-4">
          <Text className="font-semibold text-muted-foreground text-xs">
            Version 1.0.0
          </Text>
          <Text className="text-[10px] text-muted-foreground/60">
            © CtrlShiftResQ
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
