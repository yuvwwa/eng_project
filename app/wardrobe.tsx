import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';

import Head from '@/assets/wardrobe/head.svg';
import Body from '@/assets/wardrobe/body.svg';
import Podium from '@/assets/wardrobe/podium.svg';
import Star from '@/assets/wardrobe/star.svg';
import Home from '@/assets/wardrobe/home.svg';
import Star2 from '@/assets/wardrobe/star_clothes.svg';

import Bow from '@/assets/wardrobe/bow.svg';
import Cap from '@/assets/wardrobe/cap.svg';
import Flowers from '@/assets/wardrobe/flowers.svg';
import Glasses from '@/assets/wardrobe/glasses.svg';
import Jeans from '@/assets/wardrobe/jeans.svg';
import Pants from '@/assets/wardrobe/pants.svg';
import Shorts from '@/assets/wardrobe/shorts.svg';
import StripedJacket from '@/assets/wardrobe/striped_jacket.svg';
import TshirtWithName from '@/assets/wardrobe/t-shirt_with_name.svg';
import Undershirt from '@/assets/wardrobe/undershirt.svg';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';

// Определяем категории одежды и типы
type CategoryType = 'headwear' | 'eyewear' | 'tops' | 'bottoms';
type ItemId = string;

interface ClothingPosition {
  top: number;
  left?: number;
  width: number;
  height: number;
  zIndex?: number;
}

const categories: Record<CategoryType, ItemId[]> = {
  headwear: ['bow', 'cap', 'flowers'],
  eyewear: ['glasses'],
  tops: ['striped_jacket', 'tshirt_with_name', 'undershirt'],
  bottoms: ['pants', 'shorts', 'jeans'],
};

// Индивидуальные настройки позиционирования для каждого предмета одежды
const itemPositions: Record<string, ClothingPosition> = {
  // Головные уборы
  bow: { top: 60, width: 47.53, height: 24.17, zIndex: 5 },
  cap: { top: 75, width: 122.71, height: 45.23, zIndex: 5 },
  flowers: { top: 70, width: 132.69, height: 49.74, zIndex: 5 },

  // Очки
  glasses: { top: 122, width: 122.7, height: 34.12, zIndex: 5 },

  // Верхняя одежда
  striped_jacket: {
    top: 170,
    width: 135.13,
    height: 105.6,
    zIndex: 3,
    left: 130,
  },
  tshirt_with_name: {
    top: 170,
    width: 134.13,
    height: 101.6,
    zIndex: 3,
    left: 132,
  },
  undershirt: { top: 175, width: 95.51, height: 80.99, zIndex: 3, left: 150 },

  // Нижняя одежда
  pants: { top: 241, width: 100.18, height: 66.18, zIndex: 2, left: 148 },
  shorts: { top: 240, width: 93.54, height: 49.51, zIndex: 2, left: 149 },
  jeans: { top: 240, width: 91.51, height: 62.86, zIndex: 2, left: 151 },
};

// Функция для получения категории по ID предмета
const getCategoryById = (id: string): CategoryType | null => {
  for (const [category, items] of Object.entries(categories)) {
    if (items.includes(id)) {
      return category as CategoryType;
    }
  }
  return null;
};

interface ClothingItem {
  id: string;
  icon: React.FC<any>;
  price: number;
  category: CategoryType;
}

const clothingItems: ClothingItem[] = [
  { id: 'bow', icon: Bow, price: 10, category: 'headwear' },
  { id: 'cap', icon: Cap, price: 10, category: 'headwear' },
  { id: 'flowers', icon: Flowers, price: 10, category: 'headwear' },
  { id: 'glasses', icon: Glasses, price: 10, category: 'eyewear' },
  { id: 'striped_jacket', icon: StripedJacket, price: 10, category: 'tops' },
  { id: 'tshirt_with_name', icon: TshirtWithName, price: 10, category: 'tops' },
  { id: 'undershirt', icon: Undershirt, price: 10, category: 'tops' },
  { id: 'pants', icon: Pants, price: 10, category: 'bottoms' },
  { id: 'shorts', icon: Shorts, price: 10, category: 'bottoms' },
  { id: 'jeans', icon: Jeans, price: 10, category: 'bottoms' },
];

export default function WardrobeScreen() {
  const router = useRouter();
  const [appliedItems, setAppliedItems] = useState<
    Partial<Record<CategoryType, string>>
  >({});
  const [ownedItems, setOwnedItems] = useState<string[]>([]);
  const [stars, setStars] = useState(55);

  useBackgroundMusic(true);

  const handlePressItem = (
    id: string,
    price: number,
    category: CategoryType,
  ) => {
    const isOwned = ownedItems.includes(id);
    const isApplied = appliedItems[category] === id;

    if (!isOwned) {
      // Покупка предмета
      if (stars >= price) {
        setStars(prev => prev - price);
        setOwnedItems(prev => [...prev, id]);
      }
    } else if (!isApplied) {
      // Применение предмета (с учетом категории)
      setAppliedItems(prev => ({
        ...prev,
        [category]: id,
      }));
    } else {
      // Снятие предмета
      setAppliedItems(prev => {
        const newItems = { ...prev };
        delete newItems[category];
        return newItems;
      });
    }
  };

  // Получение всех применённых предметов в виде массива для отображения
  const appliedItemsArray = Object.values(appliedItems);

  // Функция для расположения элементов гардероба на соответствующих местах
  const getItemStyle = (category: CategoryType): ViewStyle => {
    const baseLeft = (Dimensions.get('window').width - 156) / 2;

    switch (category) {
      case 'headwear':
        return {
          top: 10,
          left: baseLeft,
          zIndex: 5,
        };
      case 'eyewear':
        return {
          top: 50,
          left: baseLeft,
          zIndex: 4,
        };
      case 'tops':
        return {
          top: 70,
          left: baseLeft,
          zIndex: 3,
        };
      case 'bottoms':
        return {
          top: 160,
          left: baseLeft,
          zIndex: 2,
        };
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Home width={32} height={32} />
      </TouchableOpacity>

      {/* Stars */}
      <View style={styles.starsContainer}>
        <Text style={styles.starsText}>{stars}</Text>
        <Star width={33} height={32} style={styles.starIcon} />
      </View>

      {/* Stage (Podium + Alien + Clothes) */}
      <View style={styles.stage}>
        <Podium style={styles.podium} />
        <Head style={styles.head} />
        <Body style={styles.body} />

        {/* Отображаем одежду с индивидуальными настройками позиционирования */}
        {Object.entries(appliedItems).map(([categoryKey, id]) => {
          const item = clothingItems.find(c => c.id === id);
          if (!item) return null;

          const Icon = item.icon;
          const position = itemPositions[id];
          const baseLeft =
            position.left !== undefined
              ? position.left
              : (Dimensions.get('window').width - position.width) / 2;

          return (
            <Icon
              key={id}
              width={position.width}
              height={position.height}
              style={[
                styles.overlay,
                {
                  top: position.top,
                  left: baseLeft,
                  zIndex: position.zIndex || 3,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Clothing Scroll Panel */}
      <ScrollView
        style={styles.clothingPanel}
        contentContainerStyle={styles.clothingPanelContent}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <FlatList
          data={clothingItems}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={styles.clothesGrid}
          renderItem={({ item }) => {
            const isOwned = ownedItems.includes(item.id);
            const isApplied = appliedItems[item.category] === item.id;
            const Icon = item.icon;

            let buttonContent;
            if (!isOwned) {
              buttonContent = (
                <>
                  <Star2 width={12} height={12} />
                  <Text style={styles.priceText}>{item.price}</Text>
                </>
              );
            } else {
              buttonContent = (
                <Text style={styles.priceText}>
                  {isApplied ? 'Take off' : 'Apply'}
                </Text>
              );
            }

            return (
              <TouchableOpacity
                onPress={() =>
                  handlePressItem(item.id, item.price, item.category)
                }
                style={[
                  styles.clothesItem,
                  isApplied && {
                    borderColor: '#312A54',
                    borderWidth: 4,
                  },
                ]}>
                <Icon width={54} height={54} style={{ marginTop: -20 }} />
                <View style={styles.priceButton}>
                  <View style={styles.priceContent}>{buttonContent}</View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFF3',
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: '46%',
    right: 0,
    width: 62,
    height: 58,
    backgroundColor: '#658BF5',
    borderBottomLeftRadius: 45,
    borderTopLeftRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 75,
    right: 20,
    width: 84,
    height: 39,
    justifyContent: 'center',
    zIndex: 2,
  },
  starIcon: {
    marginLeft: 10,
  },
  starsText: {
    fontSize: 28,
    fontFamily: 'BrunoAce_400Regular',
    color: '#000',
  },
  stage: {
    marginTop: 100,
    alignItems: 'center',
    height: 500,
    position: 'relative',
  },
  podium: {
    position: 'absolute',
    top: 270,
    left: 76.47,
    width: 239,
    height: 324,
    zIndex: 1,
  },
  head: {
    position: 'absolute',
    top: 46,
    left: (Dimensions.get('window').width - 156) / 2,
    width: 151.29,
    height: 137.71,
    zIndex: 4,
  },
  body: {
    position: 'absolute',
    top: 175,
    left: (Dimensions.get('window').width - 130.51) / 2,
    width: 130.51,
    height: 142.68,
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    width: 156,
    height: 276,
    zIndex: 3,
  },
  clothingPanel: {
    width: '100%',
    backgroundColor: '#658BF5',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    minHeight: 240,
    zIndex: 4,
    marginTop: -130,
  },
  clothingPanelContent: {
    paddingBottom: 40,
  },
  clothesGrid: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  clothesItem: {
    width: 104.26,
    height: 101,
    backgroundColor: '#FDFFF3',
    borderRadius: 15,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  priceButton: {
    position: 'absolute',
    bottom: 10,
    width: 83.4,
    height: 18,
    backgroundColor: '#CEEC97',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 2,
    fontWeight: 'bold',
  },
});
