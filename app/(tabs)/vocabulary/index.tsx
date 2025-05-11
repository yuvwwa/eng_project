import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

// Получение размеров экрана для адаптивности
const { width } = Dimensions.get('window');
const SIDE_PADDING = 30; // Отступы по бокам 30px

export default function LevelsScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>My words</Text>
      </View>

      {/* Кнопка выбора уровня */}
      <TouchableOpacity 
        style={styles.levelButton}
        onPress={() => router.push('/(tabs)/vocabulary/vocabulary_list')}
      >
        <Text style={styles.levelButtonText}>1 level</Text>
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
  levelButton: {
    backgroundColor: '#FDFFF3',
    width: '100%',
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 15,
  },
  levelButtonText: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'BrunoAce_400Regular',
  },
});