import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export default function BreathRing() {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.3, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={[styles.ring, ringStyle]} />;
}

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgb(255, 161, 55)',
    zIndex: -1,
  },
});
