import { useState } from "react";
import { View } from "react-native";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export function Broadcast({ defaultChecked }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <View className="flex h-fit w-full flex-col items-center justify-center gap-3">
      <Text variant="small" className="text-muted-foreground">
        STATUS BROADCAST
      </Text>

      <Switch
        className="scale-125"
        checked={checked}
        onCheckedChange={(value) => setChecked(value)}
      />
      <Text
        className={cn("font-bold text-primary", {
          "text-foreground": !checked,
        })}
      >
        RECOVERY MODE: {checked ? "ACTIVE" : "INACTIVE"}
      </Text>
    </View>
  );
}
