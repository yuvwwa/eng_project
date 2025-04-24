import WorldMap from '@/components/WorldMap';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function MapScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WorldMap />
    </GestureHandlerRootView>
  );
}
