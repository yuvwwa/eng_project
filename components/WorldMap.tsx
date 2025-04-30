import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolateColor,
  withDecay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  ButtonScalesMap,
  ContinentModel,
  ContinentsModel,
} from '@/models/continents.model';
import BreathRing from './ui/BreathRing';
import ContinentHeader from '@/components/ContinentHeader';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAP_WIDTH = SCREEN_WIDTH * 3.1;
const MAP_HEIGHT = SCREEN_HEIGHT;

const MAX_X = (MAP_WIDTH - SCREEN_WIDTH) / 2;
const MAX_Y = 0;

const ELASTIC_RANGE = 30;

export default function WorldMap() {
  const [activeButtonId, setActiveButtonId] = useState<number | null>(null);

  const waterColorAnimation = useSharedValue(0);
  const dashLineRadius = useSharedValue(30); // Радиус пунктирной линии

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const buttonScales = useRef(
    ContinentsModel.reduce(
      (acc: ButtonScalesMap, continent: ContinentModel) => {
        continent.steps.forEach(button => {
          acc[button.id] = useSharedValue(1);
        });
        return acc;
      },
      {},
    ),
  ).current;

  useEffect(() => {
    waterColorAnimation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 6000 }),
        withTiming(0, { duration: 6000 }),
      ),
      -1,
      true,
    );

    dashLineRadius.value = withRepeat(
      withSequence(
        withTiming(26, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(33, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  const oceanAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        waterColorAnimation.value,
        [0, 0.5, 1],
        ['#1e78ff', '#0066ff', '#0052cd'],
      ),
    };
  });

  const checkBoundaries = () => {
    if (translationX.value > MAX_X) translationX.value = withTiming(MAX_X);
    else if (translationX.value < -MAX_X)
      translationX.value = withTiming(-MAX_X);
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translationX.value;
      startY.value = translationY.value;
      translationX.value = withTiming(translationX.value, { duration: 1 });
      translationY.value = withTiming(translationY.value, { duration: 1 });
    })
    .onUpdate(event => {
      let newX = startX.value + event.translationX;
      let newY = startY.value + event.translationY * 0.2;

      if (newX > MAX_X) {
        const overX = newX - MAX_X;
        newX = MAX_X + (ELASTIC_RANGE * overX) / (ELASTIC_RANGE + overX);
      } else if (newX < -MAX_X) {
        const overX = -MAX_X - newX;
        newX = -MAX_X - (ELASTIC_RANGE * overX) / (ELASTIC_RANGE + overX);
      }

      if (newY > MAX_Y) {
        const overY = newY - MAX_Y;
        newY = MAX_Y + (ELASTIC_RANGE * overY) / (ELASTIC_RANGE + overY * 2);
      } else if (newY < -MAX_Y) {
        const overY = -MAX_Y - newY;
        newY = -MAX_Y - (ELASTIC_RANGE * overY) / (ELASTIC_RANGE + overY * 2);
      }

      translationX.value = newX;
      translationY.value = newY;
    })
    .onEnd((event, _) => {
      const isOutOfBoundsX =
        translationX.value < -MAX_X || translationX.value > MAX_X;
      const isOutOfBoundsY =
        translationY.value < -MAX_Y || translationY.value > MAX_Y;

      if (isOutOfBoundsX) {
        const targetX = translationX.value > MAX_X ? MAX_X : -MAX_X;
        translationX.value = withTiming(targetX, {
          duration: 400,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      } else {
        translationX.value = withDecay(
          {
            velocity: event.velocityX,
            clamp: [-MAX_X - ELASTIC_RANGE, MAX_X + ELASTIC_RANGE],
            deceleration: 0.992,
          },
          () => {
            runOnJS(checkBoundaries)();
          },
        );
      }

      if (isOutOfBoundsY || Math.abs(translationY.value) > 5) {
        translationY.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
    });

  const mapAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
      ],
    };
  });

  const animateButton = (buttonId: number) => {
    buttonScales[buttonId].value = withSequence(
      withTiming(1.2, { duration: 150 }),
      withTiming(1, { duration: 150 }),
    );
  };

  const handleButtonPress = (buttonId: number, continentName: string) => {
    animateButton(buttonId);
    console.log(`Нажата кнопка ${buttonId} на материке ${continentName}`);

    const button = ContinentsModel.flatMap(c => c.steps).find(
      b => b.id === buttonId,
    );
    if (!button?.isAvailble) return;

    setActiveButtonId(buttonId);
  };

  const getButtonAnimatedStyle = (buttonId: number) => {
    return useAnimatedStyle(() => {
      return {
        transform: [{ scale: buttonScales[buttonId].value }],
        opacity: buttonScales[buttonId].value === 1.2 ? 0.8 : 1,
      };
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.backgroundOcean, oceanAnimatedStyle]} />

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.mapContainer, mapAnimatedStyle]}>
          <Svg
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            style={styles.continentsContainer}>
            {ContinentsModel.map(continent => (
              <G
                key={continent.id}
                transform={`translate(${continent.offsetX || 0}, ${
                  continent.offsetY || 0
                }) scale(${continent.scale || 1})`}>
                <Path d={continent.path} fill={continent.fill} />
              </G>
            ))}
          </Svg>

          {/* Continent Headers */}
          {ContinentsModel.map(continent => (
            <ContinentHeader
              key={`header-${continent.id}`}
              continent={continent}
              activeButtonId={activeButtonId}
            />
          ))}

          {ContinentsModel.map(continent =>
            continent.steps.map(button => {
              const adjustedX =
                button.x * (continent.scale || 1) + (continent.offsetX || 0);
              const adjustedY =
                button.y * (continent.scale || 1) + (continent.offsetY || 0);

              const isActive = activeButtonId === button.id;

              return (
                <Animated.View
                  key={button.id}
                  style={[
                    styles.buttonContainer,
                    {
                      left: adjustedX,
                      top: adjustedY,
                    },
                    getButtonAnimatedStyle(button.id),
                  ]}>
                  {isActive && <BreathRing />}
                  <Pressable
                    style={[
                      styles.button,
                      !button.isAvailble && styles.disabledButton,
                      isActive && styles.activeButton,
                    ]}
                    onPress={() => handleButtonPress(button.id, continent.sid)}>
                    <Text
                      style={[
                        styles.buttonText,
                        isActive && styles.activeText,
                        !button.isAvailble && styles.disabledText,
                      ]}>
                      {button.label}
                    </Text>
                  </Pressable>
                </Animated.View>
              );
            }),
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  backgroundOcean: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  mapContainer: {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    position: 'absolute',
    top: -MAP_HEIGHT / 2 + SCREEN_HEIGHT / 2,
    left: -MAP_WIDTH / 2 + SCREEN_WIDTH / 2,
  },
  continentsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 20,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: 'rgb(189, 189, 189)',
  },
  activeButton: {
    backgroundColor: 'rgb(255, 161, 55)',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
  },
  disabledText: {
    color: '#f1f1f1',
  },
  activeText: {
    color: '#ffffff',
  },
});
