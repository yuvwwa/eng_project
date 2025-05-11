import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Dimensions, 
  Animated 
} from 'react-native';
import { SvgProps } from 'react-native-svg';

// SVG иконки
import HiIcon from '@/assets/vocabulary/hi.svg';
import NameIcon from '@/assets/vocabulary/name.svg';
import FriendIcon from '@/assets/vocabulary/friend.svg';
import HouseIcon from '@/assets/vocabulary/house.svg';
import FoodIcon from '@/assets/vocabulary/food.svg';
import AppleIcon from '@/assets/vocabulary/apple.svg';
import SoundIcon from '@/assets/vocabulary/sound.svg'; // Иконка звука

const { width } = Dimensions.get('window');
const SIDE_PADDING = 30;
const CARD_SPACING = 15;
const CARD_WIDTH = (width - (SIDE_PADDING * 2) - CARD_SPACING) / 2;

type WordCardProps = {
  label: string;
  translation: string;
  Icon: React.FC<SvgProps>;
  iconSize: { width: number; height: number };
};

const WordCard: React.FC<WordCardProps> = ({ label, translation, Icon, iconSize }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }]
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }]
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={flipCard} 
        style={styles.cardTouchable}
      >
        {/* Front side */}
        <Animated.View style={[styles.card, frontAnimatedStyle, { backfaceVisibility: 'hidden' }]}>
          <View style={styles.iconContainer}>
            <Icon width={iconSize.width} height={iconSize.height} />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
            {/* Иконка звука на лицевой стороне */}
            <TouchableOpacity onPress={(e) => e.stopPropagation()}>
              <SoundIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Back side */}
        <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle, { backfaceVisibility: 'hidden' }]}>
          <View style={styles.iconContainer}>
            <Icon width={iconSize.width} height={iconSize.height} />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{translation}</Text>
            {/* Иконка звука на обратной стороне */}
            <TouchableOpacity onPress={(e) => e.stopPropagation()}>
              <SoundIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const words: (WordCardProps & { id: string })[] = [
  { id: '1', label: 'Hi', translation: 'Привет', Icon: HiIcon, iconSize: { width: 46, height: 73.53 } },
  { id: '2', label: 'Name', translation: 'Имя', Icon: NameIcon, iconSize: { width: 117, height: 117 } },
  { id: '3', label: 'Friend', translation: 'Друг', Icon: FriendIcon, iconSize: { width: 99, height: 115 } },
  { id: '4', label: 'House', translation: 'Дом', Icon: HouseIcon, iconSize: { width: 69, height: 69 } },
  { id: '5', label: 'Food', translation: 'Еда', Icon: FoodIcon, iconSize: { width: 72, height: 72 } },
  { id: '6', label: 'Apple', translation: 'Яблоко', Icon: AppleIcon, iconSize: { width: 68, height: 68 } },
];

export default function WordScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>My words</Text>
      </View>

      <Text style={styles.level}>1 level</Text>

      <View style={styles.wordsContainer}>
        <FlatList
          data={words}
          renderItem={({ item }) => (
            <WordCard 
              label={item.label} 
              translation={item.translation}
              Icon={item.Icon} 
              iconSize={item.iconSize}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
        />
      </View>

      <TouchableOpacity style={styles.repeatButton}>
        <Text style={styles.repeatText}>Repeat words</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#312A54',
    paddingHorizontal: SIDE_PADDING,
    paddingTop: '20%',
  },
  headerBox: {
    width: 168,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'BrunoAce_400Regular',
  },
  level: {
    fontSize: 22,
    fontFamily: 'BrunoAce_400Regular',
    color: 'white',
    marginBottom: '5%',
    width: 76,
    height: 27,
  },
  wordsContainer: {
    height: '51%',
  },
  grid: {
    paddingTop: 0,
  },
  row: {
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: CARD_SPACING,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.92,
  },
  cardTouchable: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: '#FDFFF3',
    borderRadius: 15,
    padding: 10,
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    transform: [{ rotateY: '180deg' }],
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 6,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 30,
  },
  label: {
    fontSize: 22,
    color: 'black',
    marginRight: 8,
  },
  repeatButton: {
    backgroundColor: '#CEEC97',
    width: 240,
    height: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  repeatText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
