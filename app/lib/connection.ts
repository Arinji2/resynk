import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export default function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online = state.isConnected && state.isInternetReachable;
      setIsOnline(!!online);
    });

    return () => unsubscribe();
  }, []);

  return {
    isOnline,
  };
}

export const checkConnection = async () => {
  const state = await NetInfo.fetch();
  console.log("Is connected?", state.isConnected);
  console.log("Is internet reachable?", state.isInternetReachable);
};
