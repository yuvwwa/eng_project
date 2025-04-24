import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { TokenService } from '@/services/TokenService';

let storeRef: any = null;

export const API_URL = 'http://62.109.18.58:3000/api';

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// instance specially for refresh
const rawApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

export const initAxiosInterceptors = (store: any) => {
  storeRef = store;

  api.interceptors.request.use(
    async (
      config: InternalAxiosRequestConfig,
    ): Promise<InternalAxiosRequestConfig> => {
      const accessToken = await TokenService.getAccessToken();
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      if (
        originalRequest &&
        error.response?.status === 401 &&
        !(originalRequest as any)._retry
      ) {
        (originalRequest as any)._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = (async () => {
            try {
              const refreshToken = await TokenService.getRefreshToken();
              if (!refreshToken) throw new Error('No refresh token');

              const response = await rawApi.post('/auth/refresh', {
                refresh_token: refreshToken,
              });

              const tokens = response.data;
              await TokenService.setTokens(tokens);
              return { tokens };
            } catch (err) {
              await TokenService.removeTokens();
              throw err;
            } finally {
              isRefreshing = false;
            }
          })();
        }

        try {
          const result = await refreshPromise;
          const { access_token } = result.tokens;

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          storeRef.dispatch(storeRef.logout());
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};
