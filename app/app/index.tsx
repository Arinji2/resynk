import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { ScrollView, View } from "react-native";
import { Broadcast } from "@/components/routes/dashboard/broadcast";
import { Notice } from "@/components/routes/dashboard/notice";
import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{ header: () => <Header title="Recovery Dashboard" /> }}
      />
      <ScrollView
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 40,
          paddingBottom: 40,
        }}
      >
        <Notice
          status="warning"
          title="Severe Weather Warning"
          description="Flood warning in effect for your sector (Zone A). Please avoid low-lying areas and check local news."
        />
        <View className="flex h-fit w-fit flex-col items-center justify-center gap-10 rounded-lg border-[0.5px] border-border bg-background p-4">
          <Broadcast />

          <View className="flex h-fit w-[70%] flex-col items-center justify-center gap-6">
            <View className="flex h-fit w-full flex-row items-center justify-between">
              <View className="flex h-fit w-fit flex-col items-center justify-center">
                <Text variant={"h3"} className="font-bold">
                  12
                </Text>
                <Text variant={"muted"}>Reports Nearby</Text>
              </View>
              <View className="flex h-fit w-fit flex-col items-center justify-center">
                <Text variant={"h3"} className="font-bold">
                  1Km
                </Text>
                <Text variant={"muted"}>Radius Active</Text>
              </View>
            </View>
            <Button className="h-fit w-full py-3">
              <Link href="/reports">
                <MaterialIcons name="add-circle" size={18} color="white" />
                <Text>Create New Report</Text>
              </Link>
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
