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

      <View style={styles.warnBox}>
        <Text style={styles.warn}>You don't have any completed words at this level yet.</Text>
      </View>
      <TouchableOpacity 
        style={styles.repeatButton}
        onPress={() => router.push('/(tabs)/map')}>
        <Text style={styles.repeatText}>Let's study English!</Text>
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
  warnBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  warn: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  repeatButton: {
    backgroundColor: '#CEEC97',
    width: '100%',
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 190,
  },
  repeatText: {
    color: '#222',
    fontSize: 22,
    fontWeight: 'bold',
  },
  
});