import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { TokenService } from '@/services/TokenService';
import { JwtService } from '@/services/JWTService';

let storeRef: any = null;

export const API_URL = '';

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const initAxiosInterceptors = (store: any) => {
  storeRef = store;

  api.interceptors.request.use(
    async (
      config: InternalAxiosRequestConfig,
    ): Promise<InternalAxiosRequestConfig> => {
      const accessToken = await TokenService.getAccessToken();

      if (accessToken) {
        if (JwtService.isTokenExpired(accessToken)) {
          try {
            const resultAction = await storeRef.dispatch(
              storeRef.refreshTokens(),
            );

            if (storeRef.refreshTokens.fulfilled.match(resultAction)) {
              const { access_jwt } = resultAction.payload.tokens;
              config.headers = config.headers || {};
              config.headers.Authorization = `Bearer ${access_jwt}`;
            }
          } catch (error) {
            console.error('Failed to refresh token:', error);
          }
        } else {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
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

        try {
          const resultAction = await storeRef.dispatch(
            storeRef.refreshTokens(),
          );

          if (storeRef.refreshTokens.fulfilled.match(resultAction)) {
            const { access_jwt } = resultAction.payload.tokens;
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${access_jwt}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          storeRef.dispatch(storeRef.logout());
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};
