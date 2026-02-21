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
import * as Notifications from "expo-notifications";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { BottomBar } from "@/components/shared/bottom-bar";
import { GridBackground } from "@/components/shared/grid";
import { RecoveryModeProvider } from "@/lib/RecoveryModeProvider";
import { THEME } from "@/lib/theme";
import { useOnlineSync } from "@/lib/useOnlineSync";
import { useUserProfile } from "@/lib/useUserProfile";
import { queryClient } from "@/query-client";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Ignore this error till it gets fixed, UPSTREAM ISSUE
// LogBox.ignoreLogs(["SafeAreaView has been deprecated"]);

const SCREEN_OPTIONS = {
  light: {
    headerTransparent: false,
    headerShadowVisible: false,
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
  const { user, loaded } = useUserProfile();

  useEffect(() => {
    if (loaded && (!user || !user.role)) {
      router.replace("/onboarding");
    }
  }, [loaded, user]);

  useOnlineSync();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: false,
    }),
  });
  if (!fontsLoaded || !loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1, backgroundColor: THEME.background }}>
        <GridBackground />
        <RecoveryModeProvider>
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
                backgroundColor: "transparent",
                paddingHorizontal: 10,
              },
            }}
          />

          <BottomBar />
        </RecoveryModeProvider>
        <PortalHost />
      </View>
    </QueryClientProvider>
  );
}
