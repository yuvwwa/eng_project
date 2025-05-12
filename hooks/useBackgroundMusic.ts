import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export const useBackgroundMusic = (active: boolean = true) => {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const load = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/audio/background-music.mp3'),
        {
          isLooping: true,
          volume: 0.3,
        },
      );
      soundRef.current = sound;

      if (active) await sound.playAsync();
    };

    load();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    if (!soundRef.current) return;

    const updatePlayback = async () => {
      if (active) await soundRef.current?.playAsync();
      else await soundRef.current?.pauseAsync();
    };

    updatePlayback();
  }, [active]);
};
