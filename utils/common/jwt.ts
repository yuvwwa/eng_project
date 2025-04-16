import jwtDecode from 'jwt-decode';
import { ILoginJWTDecode } from '@/models/login-response.model';

export function getCredentialsFromToken(token: string): ILoginJWTDecode {
  return jwtDecode.jwtDecode<ILoginJWTDecode>(token);
}
