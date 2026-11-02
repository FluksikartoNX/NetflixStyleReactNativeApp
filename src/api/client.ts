import { AxiosError, create } from 'axios';

// Only variables prefixed with EXPO_PUBLIC_ are inlined at build time; others are undefined.
// They must be read as `process.env.EXPO_PUBLIC_X` literally (no destructuring / dynamic keys).
// Restart with `npx expo start -c` after changing .env. See .env.example.
const API_URL = process.env.EXPO_PUBLIC_OMDB_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_OMDB_API_KEY;

export const apiClient = create({
  baseURL: API_URL,
  params: { apikey: API_KEY },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

apiClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export type ApiError = {
  status: number | null;
  message: string;
};

function toApiError(error: AxiosError<{ message?: string }>): ApiError {
  return {
    status: error.response?.status ?? null,
    message: error.response?.data?.message ?? error.message ?? 'Unknown error',
  };
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      // Hook for logging out / refreshing the token later.
    }
    return Promise.reject(toApiError(error));
  },
);
