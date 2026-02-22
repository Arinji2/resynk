import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "user_profile";

export type UserRole = "citizen" | "volunteer";

export type UserProfile = {
  role: UserRole;
  name: string;
  age: number;
  aadharNumber: string;
  allergies?: string | null;
  medications?: string | null;
  bloodGroup: string;
};

export function useUserProfile() {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUserState(JSON.parse(stored));
      }
      setLoaded(true);
    };
    load();
  }, []);

  const setUser = useCallback(async (profile: UserProfile) => {
    setUserState(profile);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, []);

  const clearUser = useCallback(async () => {
    setUserState(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    user,
    setUser,
    clearUser,
    loaded,
  };
}
