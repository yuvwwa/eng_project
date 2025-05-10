import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { markIntroAsShown } from '@/store/reducers/auth.reducer';

export default function IntroVideo() {
  const videoRef = useRef<Video>(null);
  const dispatch = useDispatch();

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      dispatch(markIntroAsShown());
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={require('@/assets/videos/intro.mp4')}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isLooping={false}
        isMuted={false}
        rate={1.0}
        volume={1.0}
        progressUpdateIntervalMillis={1000}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onError={error => {
          console.error('Video error:', error);
          router.replace('/(tabs)');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
