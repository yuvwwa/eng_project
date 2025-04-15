import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { store } from '@/store';
import { TokenService } from '@/services/TokenService';
import { JwtService } from '@/services/JWTService';
import { logout, refreshTokens } from '@/store/reducers/auth.reducer';

const API_URL = '';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/*api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const accessToken = await TokenService.getAccessToken();

    if (accessToken) {
      if (JwtService.isTokenExpired(accessToken)) {
        try {
          // Диспатчим через store.dispatch, так как мы не в React компоненте
          const resultAction = await store.dispatch(refreshTokens());

          if (refreshTokens.fulfilled.match(resultAction)) {
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
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Перехватчик ответов
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
        // Диспатчим через store.dispatch
        const resultAction = await store.dispatch(refreshTokens());

        if (refreshTokens.fulfilled.match(resultAction)) {
          const { access_jwt } = resultAction.payload.tokens;
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${access_jwt}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Если не удалось обновить токен, разлогиниваем пользователя
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    // Обработка других ошибок
    if (error.response) {
      // Серверные ошибки (4xx, 5xx)
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      // Запрос был сделан, но нет ответа
      console.error('Network Error:', error.request);
    } else {
      // Что-то пошло не так при настройке запроса
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  },
);*/

export default api;
