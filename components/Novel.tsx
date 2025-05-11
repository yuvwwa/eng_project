import { useState, useEffect, FC } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { NovelModel } from '@/models/NovelModel';

const { height } = Dimensions.get('window');

export const NovelModal: FC<NovelModel> = ({
  slides,
  words,
  xp,
  visible,
  onClose,
}) => {
  const [index, setIndex] = useState(0);
  const [translateY] = useState(new Animated.Value(height));

  const CurrentSlide = slides[index];

  const show = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const hide = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setIndex(0);
      onClose();
    });
  };

  const nextSlide = () => {
    if (index < slides.length - 1) setIndex(prev => prev + 1);
    else setIndex(prev => prev + 1);
  };

  const handleExperienceGet = () => hide();

  useEffect(() => {
    if (visible) show();
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[styles.modal, { transform: [{ translateY }] }]}>
        {index < slides.length ? (
          <TouchableOpacity
            style={styles.fullscreen}
            activeOpacity={1}
            onPress={nextSlide}>
            <CurrentSlide width="100%" height="100%" />
          </TouchableOpacity>
        ) : (
          <View style={styles.fullscreen}>
            <Text style={styles.newWordsHeader}>Nice one!</Text>
            <View style={styles.newWords}>
              <Text style={styles.newWordsTitle}>Новые слова</Text>
              <View style={styles.wordsContainer}>
                {words.map(w => (
                  <Text style={styles.word}>
                    {w.word} - {w.translation}
                  </Text>
                ))}
              </View>
            </View>
            <TouchableOpacity
              onPress={handleExperienceGet}
              style={styles.button}>
              <Text style={styles.text}>Забрать опыт</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.violetDark,
    zIndex: 100,
  },
  fullscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  newWords: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  newWordsHeader: {
    color: Colors.green,
    fontSize: 44,
    fontFamily: 'BrunoAce_400Regular',
    marginBottom: 25,
  },
  newWordsTitle: {
    fontSize: 32,
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  wordsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  word: {
    width: 'auto',
    color: Colors.milk,
    fontSize: 22,
  },
  button: {
    marginTop: 25,
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    paddingHorizontal: 65,
    borderRadius: 12,
  },
});
