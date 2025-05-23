import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ILoginJWTDecode,
  TokenObjectModel,
  UserCredentials,
} from '@/models/login-response.model';
import { AuthService } from '@/services/AuthService';
import { getCredentialsFromToken } from '@/utils/common/jwt';

export interface AuthState {
  isAuth: boolean;
  accessToken: string;
  refreshToken: string;
  authData: ILoginJWTDecode | null;
  shouldShowIntro: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuth: false,
  accessToken: '',
  refreshToken: '',
  authData: null,
  shouldShowIntro: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const tokens = await AuthService.login(credentials);
      return { tokens };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Не удалось войти',
      );
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: any, { rejectWithValue }) => {
    try {
      const tokens = await AuthService.register(userData);
      return { tokens };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Не удалось зарегистрироваться',
      );
    }
  },
);

export const restoreAuthState = createAsyncThunk(
  'auth/restore',
  async (_, { rejectWithValue }) => {
    try {
      return await AuthService.restoreAuth();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Не удалось восстановить сессию');
    }
  },
);

export const refreshTokens = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const tokens = await AuthService.refreshTokens();
      return { tokens };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Не удалось обновить токены');
    }
  },
);

export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ tokens: TokenObjectModel }>) {
      const { access_token: access_token, refresh_token } =
        action.payload.tokens;
      state.isAuth = true;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.authData = getCredentialsFromToken(access_token);
      state.error = null;
    },
    logout(state) {
      AuthService.logout();
      state.isAuth = false;
      state.accessToken = '';
      state.refreshToken = '';
      state.authData = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
    markIntroAsShown(state) {
      state.shouldShowIntro = false;
    },
    resetIntro(state) {
      state.shouldShowIntro = false;
    },
  },
  extraReducers: builder => {
    // Обработка login
    builder.addCase(login.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { access_token, refresh_token } = action.payload.tokens;
      state.isAuth = true;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.authData = getCredentialsFromToken(access_token);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Обработка register
    builder.addCase(register.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      const { access_token, refresh_token } = action.payload.tokens;
      state.isAuth = true;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.authData = getCredentialsFromToken(access_token);
      state.shouldShowIntro = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Обработка restoreAuthState
    builder.addCase(restoreAuthState.pending, state => {
      state.loading = true;
    });
    builder.addCase(restoreAuthState.fulfilled, (state, action) => {
      const { accessToken, refreshToken, authData } = action.payload;
      state.isAuth = true;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.authData = authData;
      state.loading = false;
    });
    builder.addCase(restoreAuthState.rejected, state => {
      state.isAuth = false;
      state.loading = false;
    });

    // Обработка refreshTokens
    builder.addCase(refreshTokens.fulfilled, (state, action) => {
      const { access_token, refresh_token } = action.payload.tokens;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.authData = getCredentialsFromToken(access_token);
    });
    builder.addCase(refreshTokens.rejected, state => {
      // При неудачном обновлении токенов разлогиниваем пользователя
      state.isAuth = false;
      state.accessToken = '';
      state.refreshToken = '';
      state.authData = null;
    });
    builder.addCase(markIntroAsShown, state => {
      state.shouldShowIntro = false;
    });
  },
});

export const { loginSuccess, logout, clearError, markIntroAsShown } =
  authSlice.actions;
export default authSlice.reducer;
