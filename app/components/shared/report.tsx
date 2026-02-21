import { MaterialIcons } from "@expo/vector-icons";
import { Image, View } from "react-native";
import { THEME } from "@/lib/theme";
import { Text } from "../ui/text";

export type ReportType = {
  id: string;
  title: string;
  description: string;
  imageUri: string;
  createdAt: number;
  deviceId: string;
  latitude?: number;
  longitude?: number;
  meshSyncId: string;
};
export function Report({ report }: { report: ReportType }) {
  return (
    <View className="flex h-[150px] w-full flex-row items-center justify-between gap-4 rounded-lg bg-card p-3">
      <View className="aspect-square w-[25%] shrink-0 overflow-hidden rounded-lg">
        {report.imageUri ? (
          <Image
            source={{ uri: report.imageUri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#e5e5e5",
            }}
          />
        )}
      </View>
      <View className="flex h-full flex-1 flex-col items-start justify-center gap-1">
        <Text className="font-bold">{report.title}</Text>
        <Text className="line-clamp-2 font-light text-sm">
          {report.description}
        </Text>
        <View className="flex w-fit flex-row items-center justify-start gap-2">
          <MaterialIcons
            name="my-location"
            size={16}
            color={THEME["muted-foreground"]}
          />

          <Text className="text-muted-foreground text-xs">
            {report.latitude && report.longitude
              ? `${report.latitude.toFixed(4)}° N, ${report.longitude.toFixed(4)}° E`
              : "Locating..."}
          </Text>
        </View>
      </View>
    </View>
  );
}
