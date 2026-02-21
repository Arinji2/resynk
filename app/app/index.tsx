import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-primary" variant={"h1"}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
