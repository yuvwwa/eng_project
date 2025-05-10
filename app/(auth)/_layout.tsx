import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        gestureEnabled: true, // возвращение назад, под вопросом
        headerShown: false, // navheader, нахуй не нужен)
      }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen
        name="intro-video"
        options={{ gestureEnabled: false, animation: 'none' }}
      />
    </Stack>
  );
}
