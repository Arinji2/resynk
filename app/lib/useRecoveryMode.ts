import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "recovery_mode";

export function useRecoveryMode() {
  const [recoveryMode, setRecoveryModeState] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);

  // Load once
  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          setRecoveryModeState(stored === "true");
        }
      } finally {
        setLoaded(true);
      }
    };

    load();
  }, []);

  const setRecoveryMode = useCallback(async (value: boolean) => {
    setRecoveryModeState(value);
    await AsyncStorage.setItem(STORAGE_KEY, String(value));
  }, []);

  return {
    recoveryMode,
    setRecoveryMode,
    loaded,
  };
}
