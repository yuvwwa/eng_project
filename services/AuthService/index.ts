import {
  ILoginJWTDecode,
  TokenObjectModel,
  UserCredentials,
} from '@/models/login-response.model';
import { TokenService } from '../TokenService';
import { JwtService } from '../JWTService';
import { api } from '@/utils/common/axios-config';

export class AuthService {
  /**
   * Аутентификация пользователя
   * @param credentials Учетные данные пользователя
   * @returns Объект с токенами доступа
   */
  static async login(credentials: UserCredentials): Promise<TokenObjectModel> {
    try {
      const response = await api.post('/auth/login', credentials);
      const tokens: TokenObjectModel = response.data;

      await TokenService.setTokens(tokens);
      return tokens;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Регистрация нового пользователя
   * @param userData Данные нового пользователя
   * @returns Объект с токенами доступа
   */
  static async register(userData: any): Promise<TokenObjectModel> {
    try {
      const response = await api.post('/auth/register', userData);
      const tokens: TokenObjectModel = response.data;

      await TokenService.setTokens(tokens);
      return tokens;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Обновление токенов авторизации
   * @returns Объект с новыми токенами
   */
  static async refreshTokens(): Promise<TokenObjectModel> {
    try {
      const refreshToken = await TokenService.getRefreshToken();

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      console.log('refresh token: ', refreshToken);

      const response = await api.post('/auth/refresh', {
        refresh_token: refreshToken,
      });

      const tokens: TokenObjectModel = response.data;
      await TokenService.setTokens(tokens);
      console.log('new tokens: ', tokens);
      return tokens;
    } catch (error) {
      console.error('Token refresh error:', error);
      await TokenService.removeTokens();
      throw error;
    }
  }

  /**
   * Выход из системы и удаление токенов
   */
  static async logout(): Promise<void> {
    try {
      const refreshToken = await TokenService.getRefreshToken();
      if (refreshToken)
        await api.post('/auth/logout', { refresh_token: refreshToken });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await TokenService.removeTokens();
    }
  }

  /**
   * Проверка и восстановление авторизации
   * @returns Объект с информацией о пользователе и токенами
   */
  static async restoreAuth(): Promise<{
    accessToken: string;
    refreshToken: string;
    authData: ILoginJWTDecode;
  }> {
    const accessToken = await TokenService.getAccessToken();
    const refreshToken = await TokenService.getRefreshToken();

    if (!accessToken || !refreshToken) {
      throw new Error('Токены не найдены');
    }

    if (JwtService.isTokenExpired(accessToken)) {
      const tokens = await this.refreshTokens();
      const authData = JwtService.getUserInfo(tokens.access_token);
      return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        authData,
      };
    }

    const authData = JwtService.getUserInfo(accessToken);
    return { accessToken, refreshToken, authData };
  }
}
