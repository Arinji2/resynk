import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import type { Glyphs } from "@/lib/icon";

type NoticeMode = "electricity" | "warning" | "water" | "medical";

const ModeMap = {
  electricity: {
    textColor: "#d97706", // text-amber-600
    bgColor: "#fffbeb", // bg-amber-50
    titleColor: "#78350f", // text-amber-900
    borderColor: "#fef3c7", // border-amber-100
    icon: "electric-bolt",
  },
  warning: {
    textColor: "#dc2626", // text-red-600
    bgColor: "#fef2f2", // bg-red-50
    titleColor: "#7f1d1d", // text-red-900
    borderColor: "#fee2e2", // border-red-100
    icon: "warning",
  },
  water: {
    textColor: "#2563eb", // text-blue-600
    bgColor: "#eff6ff", // bg-blue-50
    titleColor: "#1e3a8a", // text-blue-900
    borderColor: "#dbeafe", // border-blue-100
    icon: "water-drop",
  },
  medical: {
    textColor: "#64748b", // text-slate-500
    bgColor: "#f8fafc", // bg-slate-50
    titleColor: "#0f172a", // text-slate-900
    borderColor: "#f1f5f9", // border-slate-100
    icon: "medical-services",
  },
} as {
  [key in NoticeMode]: {
    textColor: string;
    bgColor: string;
    titleColor: string;
    borderColor: string;
    icon: Glyphs;
  };
};
export function Notice({
  title,
  description,
  status,
  sentAt,
  syncedAt,
}: {
  title: string;
  description: string;
  status: NoticeMode;
  sentAt?: Date;
  syncedAt?: Date;
}) {
  return (
    <View
      style={{
        borderColor: ModeMap[status].borderColor,
        backgroundColor: ModeMap[status].bgColor,
      }}
      className="flex-col items-start overflow-hidden rounded-xl border p-4"
    >
      <View className="flex-row items-start">
        <View
          style={{
            backgroundColor: ModeMap[status].borderColor,
          }}
          className="mr-4 h-10 w-10 items-center justify-center rounded-full"
        >
          <MaterialIcons
            name={ModeMap[status].icon}
            size={20}
            color={ModeMap[status].textColor}
          />
        </View>

        <View className="flex-1">
          <Text
            variant="h4"
            style={{
              color: ModeMap[status].titleColor,
            }}
            className="font-bold"
          >
            {title}
          </Text>

          <Text
            style={{ color: ModeMap[status].textColor }}
            className="mt-1 text-xs leading-relaxed"
          >
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}
