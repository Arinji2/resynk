import "@/global.css";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { BottomBar } from "@/components/shared/bottom-bar";
import { THEME } from "@/lib/theme";
import { queryClient } from "@/query-client";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Ignore this error till it gets fixed, UPSTREAM ISSUE
// LogBox.ignoreLogs(["SafeAreaView has been deprecated"]);

const SCREEN_OPTIONS = {
  light: {
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.background },
  },
};

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (fontsLoaded) {
    SplashScreen.hide();
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        style="dark"
        backgroundColor={THEME.background}
        translucent={false}
      />
      <Stack
        screenOptions={{
          ...SCREEN_OPTIONS.light,
          headerTitleStyle: {
            fontFamily: "Inter_700Bold",
          },
          contentStyle: {
            paddingHorizontal: 10,
          },
        }}
      />
      <BottomBar />
      <PortalHost />
    </QueryClientProvider>
  );
}
