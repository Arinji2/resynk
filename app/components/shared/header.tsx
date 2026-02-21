import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useOnlineStatus from "@/lib/connection";
import { Text } from "../ui/text";
import { cn } from "@/lib/utils";

export function Header({ title }: { title: string }) {
  const { top } = useSafeAreaInsets();
  const { isOnline } = useOnlineStatus();

  return (
    <View
      style={{ paddingTop: top - 10 }}
      className="flex h-[100px] w-full flex-row items-center justify-between border-b border-border px-[10px]"
    >
      <Text className="text-xl font-bold">{title}</Text>

      <View
        className={cn(
          "flex flex-row items-center justify-center gap-3 rounded-lg border-[0.3px] p-2 px-3",
          {
            "bg-green-100/20 border-green-300": isOnline,
            "bg-slate-200/40 border-slate-400": !isOnline,
          },
        )}
      >
        <View
          className={cn("size-3 rounded-full", {
            "bg-green-500": isOnline,
            "bg-slate-500": !isOnline,
          })}
        />

        <Text
          className={cn("text-sm font-bold tracking-tight", {
            "text-green-800": isOnline,
            "text-slate-700": !isOnline,
          })}
        >
          {isOnline ? "ONLINE" : "OFFLINE"}
        </Text>
      </View>
    </View>
  );
}
