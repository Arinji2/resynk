import { PermissionsAndroid, Platform } from "react-native";

export const checkAndRequestPermission = async (): Promise<boolean> => {
  if (Platform.OS !== "android") return true;

  const apiLevel = Platform.Version as number;

  try {
    // 1. Ask for Location First
    const locPerms = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ];
    console.log("[PERM] Requesting Location...");
    let res = await PermissionsAndroid.requestMultiple(locPerms);
    if (Object.values(res).some((status) => status !== "granted")) {
      console.warn("[PERM] Location denied");
      return false;
    }

    // 2. Ask for Bluetooth (Android 12 / API 31+)
    if (apiLevel >= 31) {
      const btPerms = [
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
      ];
      console.log("[PERM] Requesting Bluetooth...");
      res = await PermissionsAndroid.requestMultiple(btPerms);
      if (Object.values(res).some((status) => status !== "granted")) {
        console.warn("[PERM] Bluetooth denied");
        return false;
      }
    }

    // 3. Ask for Nearby Wi-Fi and Notifications (Android 13 / API 33+)
    if (apiLevel >= 33) {
      const extraPerms = [
        "android.permission.NEARBY_WIFI_DEVICES" as any,
        "android.permission.POST_NOTIFICATIONS" as any,
      ];
      console.log("[PERM] Requesting Nearby & Notifications...");
      res = await PermissionsAndroid.requestMultiple(extraPerms);
      if (res["android.permission.NEARBY_WIFI_DEVICES"] !== "granted") {
        console.warn("[PERM] Nearby WiFi Devices denied");
        return false; // Nearby Wifi is required for high bandwidth sync
      }
      if (res["android.permission.POST_NOTIFICATIONS"] !== "granted") {
        console.warn(
          "[PERM] Notifications denied (Foreground service might be silent/killed)",
        );
      }
    }

    // 4. Background Location (Android 10 / API 29+)
    // MUST be asked completely separately after foreground is granted
    if (apiLevel >= 29) {
      const bgGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      );
      if (!bgGranted) {
        console.log("[PERM] Requesting Background Location...");
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        );
      }
    }

    return true;
  } catch (err) {
    console.error("[PERM] Error requesting permissions:", err);
    return false;
  }
};
