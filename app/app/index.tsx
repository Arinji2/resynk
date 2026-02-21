import { Stack } from "expo-router";
import { View } from "react-native";
import { Notice } from "@/components/routes/dashboard";
import { Header } from "@/components/shared/header";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{ header: () => <Header title="Recovery Dashboard" /> }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Notice
          status="warning"
          title="Severe Weather Warning"
          description="Flood warning in effect for your sector (Zone A). Please avoid low-lying areas and check local news."
        />
      </View>
    </>
  );
}
