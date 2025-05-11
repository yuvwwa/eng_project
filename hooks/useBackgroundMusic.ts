import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export const useBackgroundMusic = () => {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const load = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/audio/background-music.mp3'),
        {
          isLooping: true,
          volume: 0.4,
        },
      );
      soundRef.current = sound;
      await sound.playAsync();
    };

    load();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);
};
