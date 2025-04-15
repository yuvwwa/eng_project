import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import RootLayoutContent from '@/layout/RootLayoutContent';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutContent />
    </Provider>
  );
}
