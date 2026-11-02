import { QueryClient } from '@tanstack/react-query';

import type { ApiError } from './client';

// Every queryFn rejects with ApiError (see the axios interceptor in client.ts),
// so `error` from useQuery is typed as ApiError everywhere.
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});
