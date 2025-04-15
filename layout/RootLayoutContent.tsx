import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { Slot, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { restoreAuthState } from '@/store/reducers/auth.reducer';

export default function RootLayoutContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, loading } = useSelector(
    (state: RootState) => state.authReducer,
  );
  const router = useRouter();

  useEffect(() => {
    dispatch(restoreAuthState());
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isAuth) router.replace('/(tabs)');
      else router.replace('/(auth)/login');
    }
  }, [isAuth, loading]);

  return <Slot />;
}
