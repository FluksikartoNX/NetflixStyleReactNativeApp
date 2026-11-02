import { AxiosError, create } from 'axios';

// Variables prefixed with EXPO_PUBLIC_ are inlined at build time. See .env.example.
// Note: on a physical device / Android emulator, "localhost" is NOT your PC.
// Use your PC's LAN IP (e.g. http://192.168.1.10:3000) or 10.0.2.2 for the Android emulator.
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com';

export const apiClient = create({
  baseURL: API_URL,
  timeout: 15_000,
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
