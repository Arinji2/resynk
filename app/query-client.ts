import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // don’t refetch when user focuses the window/tab
      refetchOnWindowFocus: false,
      // don’t refetch when network reconnects
      refetchOnReconnect: false,
      // don’t retry failed queries automatically
      retry: false,
      // treat cached data as "fresh" forever (no auto refetch)
      staleTime: Infinity,
    },
  },
});
