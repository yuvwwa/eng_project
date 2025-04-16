import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import RootLayoutContent from '@/layout/RootLayoutContent';
import { initAxiosInterceptors } from '@/utils/common/axios-config';
import { logout, refreshTokens } from '@/store/reducers/auth.reducer';

export default function RootLayout() {
  initAxiosInterceptors({
    ...store,
    refreshTokens,
    logout,
  });

  return (
    <Provider store={store}>
      <RootLayoutContent />
    </Provider>
  );
}
