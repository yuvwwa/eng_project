import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { Slot, SplashScreen, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { restoreAuthState } from '@/store/reducers/auth.reducer';
import { useFonts, BrunoAce_400Regular } from '@expo-google-fonts/bruno-ace';
import IntroVideo from '@/components/IntroVideo';

SplashScreen.preventAutoHideAsync();

export default function RootLayoutContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, loading, shouldShowIntro } = useSelector(
    (state: RootState) => state.authReducer,
  );
  const router = useRouter();
  const [authRestored, setAuthRestored] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

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

    prepare().then();
  }, []);

  useEffect(() => {
    if (authRestored && fontsLoaded && !loading) {
      SplashScreen.hideAsync().then(() => {
        if (isAuth) {
          if (shouldShowIntro) setShowVideo(true);
          else router.replace('/(tabs)');
        } else router.replace('/(auth)/login');
      });
    }
  }, [authRestored, fontsLoaded, loading, isAuth, shouldShowIntro]);

  if (!fontsLoaded || !authRestored || loading) return null;

  if (showVideo) return <IntroVideo />;

  return <Slot />;
}
