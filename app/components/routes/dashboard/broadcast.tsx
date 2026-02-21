import { View } from "react-native";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useRecoveryMode } from "@/lib/RecoveryModeProvider";
import { cn } from "@/lib/utils";

export function Broadcast() {
  const { recoveryMode, setRecoveryMode, loaded } = useRecoveryMode();

  if (!loaded) return null;

  return (
    <View className="flex h-fit w-full flex-col items-center justify-center gap-3">
      <Text variant="small" className="text-muted-foreground">
        STATUS BROADCAST
      </Text>

      <Switch
        className="scale-125"
        checked={recoveryMode}
        onCheckedChange={setRecoveryMode}
      />

      <Text
        className={cn("font-bold text-primary", {
          "text-foreground": !recoveryMode,
        })}
      >
        RECOVERY MODE: {recoveryMode ? "ACTIVE" : "INACTIVE"}
      </Text>
    </View>
  );
}
