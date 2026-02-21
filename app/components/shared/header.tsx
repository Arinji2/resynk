import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useOnlineStatus from "@/lib/connection";
import { Text } from "../ui/text";
export function Header({ title }: { title: string }) {
  const { top } = useSafeAreaInsets();
  const { isOnline } = useOnlineStatus();

  return (
    <View
      style={{
        paddingTop: top - 10,
      }}
      className="flex h-[100px] w-full flex-row items-center justify-between border-border border-b px-[10px]"
    >
      <Text className="font-bold text-xl">{title}</Text>
      <View className="flex h-fit w-fit flex-row items-center justify-center gap-3 rounded-lg border-[0.3px] bg-green-100/20 p-2 px-3">
        <View className="size-3 rounded-full bg-green-500"></View>
        <Text className="font-bold text-green-800 text-sm tracking-tight">
          ONLINE
        </Text>
      </View>
    </View>
  );
}
