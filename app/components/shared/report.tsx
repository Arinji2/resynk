import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { THEME } from "@/lib/theme";
import { Text } from "../ui/text";

export function Report() {
  return (
    <View className="flex h-[150px] w-full flex-row items-center justify-between gap-4 rounded-lg bg-card p-3">
      <View className="aspect-square w-[25%] shrink-0 rounded-lg bg-red-500"></View>
      <View className="flex h-full flex-1 flex-col items-start justify-center gap-1">
        <Text className="font-bold">Fallen Tree on Main Street</Text>
        <Text className="line-clamp-2 font-light text-sm">
          Large oak tree blocking two lanes. Power lines are down nearby.
        </Text>
        <View className="flex w-fit flex-row items-center justify-start gap-2">
          <MaterialIcons
            name="my-location"
            size={16}
            color={THEME["muted-foreground"]}
          />
          <Text className="text-muted-foreground text-xs">
            34.0522° N, 118.2437° W
          </Text>
        </View>
      </View>
    </View>
  );
}
