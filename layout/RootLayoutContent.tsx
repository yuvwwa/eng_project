import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { Slot, SplashScreen, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { restoreAuthState } from '@/store/reducers/auth.reducer';
import { Text } from 'react-native';
import { useFonts, BrunoAce_400Regular } from '@expo-google-fonts/bruno-ace';

SplashScreen.preventAutoHideAsync(); // предотвращаем автоскрытие в самом начале

export default function RootLayoutContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, loading } = useSelector(
    (state: RootState) => state.authReducer,
  );
  const router = useRouter();
  const [authRestored, setAuthRestored] = useState(false);

  const [fontsLoaded] = useFonts({
    BrunoAce_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await dispatch(restoreAuthState());
      } catch (e) {
        console.warn(e);
      } finally {
        setAuthRestored(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (authRestored && fontsLoaded && !loading) {
      SplashScreen.hideAsync().then(() => {
        if (isAuth) router.replace('/(tabs)');
        else router.replace('/(auth)/login');
      });
    }
  }, [authRestored, fontsLoaded, loading, isAuth]);

  if (!fontsLoaded || !authRestored || loading) return null;

  return <Slot />;
}
