import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, type RelativePathString, usePathname } from "expo-router";
import { vars } from "nativewind";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Glyphs } from "@/lib/icon";
import { THEME } from "@/lib/theme";
import { Text } from "../ui/text";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "dashboard",
  },
] as [
  {
    title: string;
    url: string;
    icon: Glyphs;
    redirect?: string;
  },
];

export function BottomBar() {
  const insets = useSafeAreaInsets();
  const currentURL = usePathname();

  if (currentURL === "/" || currentURL.startsWith("/psychologist")) {
    return null;
  }

  return (
    <View
      style={{ marginBottom: insets.bottom }}
      className="flex h-[65px] w-full flex-row items-center justify-evenly border-[#DEDEDE] bg-[#EDEDED] shadow-sm"
    >
      {items.map((item) => {
        const isActive =
          item.url === "/"
            ? currentURL === "/"
            : currentURL.startsWith(item.url);

        const itemTheme = vars({
          "--color": isActive ? THEME.accent : THEME.foreground,
        });

        return (
          <Link
            href={
              (item.redirect
                ? item.redirect
                : item.url) as unknown as RelativePathString
            }
            key={`${item.title}-${item.url}`}
          >
            <View
              style={itemTheme}
              className="flex h-fit w-fit flex-col items-center justify-center gap-1"
            >
              <MaterialIcons
                name={item.icon}
                className="color-[--color] size-5"
              />
              <Text variant="small" className="text-[--color] text-xs">
                {item.title}
              </Text>
            </View>
          </Link>
        );
      })}
    </View>
  );
}
