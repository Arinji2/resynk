import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";
import { Notice } from "@/components/routes/dashboard/notice";
import { Header } from "@/components/shared/header";
import { Text } from "@/components/ui/text";
import { THEME } from "@/lib/theme";

export default function NoticeDashboard() {
  return (
    <>
      <Stack.Screen
        options={{ header: () => <Header title="Notice Dashboard" /> }}
      />
      <ScrollView
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 40,
          paddingBottom: 40,
        }}
      >
        <View className="flex h-fit w-full flex-row items-center justify-center gap-2 rounded-md bg-primary/10 px-3 py-2">
          <MaterialIcons name="info" size={20} color={THEME.primary} />
          <Text className="text-left font-medium text-primary text-sm">
            All notices come from the government
          </Text>
        </View>
        <View className="flex w-full flex-col gap-4">
          <Text variant="muted" className="font-medium">
            OFFICIAL NOTICES
          </Text>
          <Notice
            status="warning"
            sentAt={new Date(Date.now() - 24 * 60 * 60 * 1000)}
            syncedAt={new Date()}
            title="Severe Weather Warning"
            description="Flood warning in effect for your sector (Zone A). Please avoid low-lying areas and check local news."
          />

          <Notice
            status="electricity"
            sentAt={new Date(Date.now() - 24 * 60 * 60 * 1000)}
            syncedAt={new Date()}
            title="Severe Weather Warning"
            description="Flood warning in effect for your sector (Zone A). Please avoid low-lying areas and check local news."
          />

          <Notice
            status="water"
            sentAt={new Date(Date.now() - 24 * 60 * 60 * 1000)}
            syncedAt={new Date()}
            title="Severe Weather Warning"
            description="Flood warning in effect for your sector (Zone A). Please avoid low-lying areas and check local news."
          />
        </View>
      </ScrollView>
    </>
  );
}
