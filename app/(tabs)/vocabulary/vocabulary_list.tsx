import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgProps } from 'react-native-svg';

// SVG иконки
import HiIcon from '@/assets/vocabulary/hi.svg';
import NameIcon from '@/assets/vocabulary/name.svg';
import FriendIcon from '@/assets/vocabulary/friend.svg';
import HouseIcon from '@/assets/vocabulary/house.svg';
import FoodIcon from '@/assets/vocabulary/food.svg';
import AppleIcon from '@/assets/vocabulary/apple.svg';
import SoundIcon from '@/assets/vocabulary/sound.svg';

// Получение размеров экрана для адаптивности
const { width } = Dimensions.get('window');
const SIDE_PADDING = 30; // Отступы по бокам 30px
const CARD_SPACING = 15; // Отступ между карточками 15px
// Вычисляем ширину карточки
const CARD_WIDTH = (width - (SIDE_PADDING * 2) - CARD_SPACING) / 2;

type WordCardProps = {
  label: string;
  Icon: React.FC<SvgProps>;
  iconSize: { width: number; height: number };
};

const WordCard: React.FC<WordCardProps> = ({ label, Icon, iconSize }) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <Icon width={iconSize.width} height={iconSize.height} />
    </View>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
      <SoundIcon width={24} height={24} />
    </View>
  </View>
);

const words: (WordCardProps & { id: string })[] = [
  { id: '1', label: 'Hi', Icon: HiIcon, iconSize: { width: 46, height: 73.53 } },
  { id: '2', label: 'Name', Icon: NameIcon, iconSize: { width: 117, height: 117 } },
  { id: '3', label: 'Friend', Icon: FriendIcon, iconSize: { width: 99, height: 115 } },
  { id: '4', label: 'House', Icon: HouseIcon, iconSize: { width: 69, height: 69 } },
  { id: '5', label: 'Food', Icon: FoodIcon, iconSize: { width: 72, height: 72 } },
  { id: '6', label: 'Apple', Icon: AppleIcon, iconSize: { width: 68, height: 68 } },
];

export default function WordScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>My words</Text>
      </View>

      <Text style={styles.level}>1 level</Text>

      {/* Уменьшенный контейнер со словами */}
      <View style={styles.wordsContainer}>
        <FlatList
          data={words}
          renderItem={({ item }) => (
            <WordCard label={item.label} Icon={item.Icon} iconSize={item.iconSize} />
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
    height: '51%', // Уменьшаем высоту контейнера со словами
  },
  grid: {
    paddingTop: 0,
  },
  row: {
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: CARD_SPACING, // 15px между рядами
  },
  card: {
    backgroundColor: '#FDFFF3',
    borderRadius: 15,
    padding: 10,
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.92,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    display: 'flex',
    flexDirection: 'column',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 6, // Расстояние 6px между картинкой и надписью
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 30, // Фиксированная высота для контейнера с текстом
  },
  label: {
    fontSize: 22,
    color: 'black',
    marginRight: 8, // Отступ между текстом и иконкой звука 8px
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