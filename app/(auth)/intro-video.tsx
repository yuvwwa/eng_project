import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { VideoView } from 'expo-video';
import { router } from 'expo-router';

export default function IntroVideoScreen() {
  const playerRef = useRef<VideoView>(null);

  return (
    <View style={styles.container}>
      <VideoView
        ref={playerRef}
        style={styles.video}
        source={require('@/assets/videos/intro.mp4')}
        resizeMode="contain"
        allowsFullscreen={false}
        showsTimecodes={false}
        allowsPictureInPicture={false}
        onError={(error: any) => {
          console.error('Video error:', error);
          router.replace('/(tabs)');
        }}
        onPlaying={() => console.log('Video started playing')}
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
  },
});
