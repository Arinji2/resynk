import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "recovery_mode";

type RecoveryContextType = {
  recoveryMode: boolean;
  setRecoveryMode: (value: boolean) => void;
  loaded: boolean;
};

const RecoveryContext = createContext<RecoveryContextType | null>(null);

export function RecoveryModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recoveryMode, setRecoveryModeState] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setRecoveryModeState(stored === "true");
      }
      setLoaded(true);
    })();
  }, []);

  const setRecoveryMode = async (value: boolean) => {
    setRecoveryModeState(value);
    await AsyncStorage.setItem(STORAGE_KEY, String(value));
  };

  return (
    <RecoveryContext.Provider value={{ recoveryMode, setRecoveryMode, loaded }}>
      {children}
    </RecoveryContext.Provider>
  );
}

export function useRecoveryMode() {
  const ctx = useContext(RecoveryContext);
  if (!ctx) throw new Error("useRecoveryMode must be used inside Provider");
  return ctx;
}
