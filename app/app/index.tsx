import { Stack } from "expo-router";
import { View } from "react-native";
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
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
    </>
  );
}
