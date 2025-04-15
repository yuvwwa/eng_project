import * as SecureStore from 'expo-secure-store';
import { TokenObjectModel } from '@/models/login-response.model';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

export class TokenService {
  static async setTokens({
    access_jwt,
    refresh_jwt,
  }: TokenObjectModel): Promise<void> {
    try {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access_jwt);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh_jwt);
    } catch (error) {
      console.error('Error saving tokens:', error);
      throw new Error('Не удалось сохранить токены');
    }
  }

  static async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  static async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  static async removeTokens(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing tokens:', error);
      throw new Error('Не удалось удалить токены');
    }
  }

  static async hasTokens(): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    const refreshToken = await this.getRefreshToken();
    return !!(accessToken && refreshToken);
  }
}
