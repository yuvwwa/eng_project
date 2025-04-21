import { jwtDecode } from 'jwt-decode';
import { ILoginJWTDecode } from '@/models/login-response.model';

interface JwtPayload {
  exp: number;
  iat: number;
  [key: string]: any;
}

export class JwtService {
  /**
   * Декодирует JWT токен и извлекает данные пользователя
   * @param token JWT токен
   * @returns Декодированные данные пользователя
   */
  static decodeToken<T = ILoginJWTDecode>(token: string): T {
    try {
      return jwtDecode<T>(token);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      throw new Error('Невозможно декодировать токен');
    }
  }

  /**
   * Проверяет, истек ли срок действия токена
   * @param token JWT токен
   * @param bufferTime Дополнительное время в секундах перед истечением срока (по умолчанию 60с)
   * @returns true если токен истек или истечет в течение bufferTime
   */
  static isTokenExpired(token: string, bufferTime = 60): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);

      return decoded.exp < currentTime + bufferTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  /**
   * Получает время жизни токена в секундах
   * @param token JWT токен
   * @returns Оставшееся время жизни токена в секундах
   */
  static getTokenLifetime(token: string): number {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return Math.max(0, decoded.exp - currentTime);
    } catch (error) {
      console.error('Error calculating token lifetime:', error);
      return 0;
    }
  }

  /**
   * Получает информацию о пользователе из токена
   * @param token JWT токен
   * @returns Данные пользователя
   */
  static getUserInfo(token: string): ILoginJWTDecode {
    return this.decodeToken<ILoginJWTDecode>(token);
  }
}
