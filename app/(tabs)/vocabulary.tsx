import { StyleSheet, Button } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { AuthService } from '@/services/AuthService';
import { logout } from '@/store/reducers/auth.reducer';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';

export default function TabTwoScreen() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <Button
        title="Выйти"
        onPress={async () => {
          await AuthService.logout();
          dispatch(logout());
        }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
