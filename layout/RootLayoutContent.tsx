import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { Slot, SplashScreen, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { restoreAuthState } from '@/store/reducers/auth.reducer';
import { Text } from 'react-native';

export default function RootLayoutContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, loading } = useSelector(
    (state: RootState) => state.authReducer,
  );
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await dispatch(restoreAuthState());
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && !loading) {
      SplashScreen.hideAsync().then(() => {
        if (isAuth) router.replace('/(tabs)');
        else router.replace('/(auth)/login');
      });
    }
  }, [appIsReady, loading, isAuth]);
  // TODO: сделать экран загрузки и скелетоны
  if (!appIsReady || loading) return <Text>Loading...</Text>;

  return <Slot />;
}
