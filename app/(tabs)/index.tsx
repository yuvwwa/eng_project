import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Alien, Earth, Vector, Polygon, Hanger } from '@/assets/homeScreen';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Planet Background */}
      <View style={styles.planetContainer}>
        <Earth style={styles.earthBase} />
        <Vector style={styles.earthOverlay} />
      </View>

      {/* Alien */}
      <View style={styles.alienContainer}>
        <Alien style={styles.alien} />

        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>I missed you!</Text>
        </View>

        <Polygon style={styles.speechTail} />
      </View>

      {/* Let's Play Button */}
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => router.replace('/(tabs)/map')}>
        <Text style={styles.playButtonText}>Let's play!</Text>
      </TouchableOpacity>

      {/* Wardrobe Button */}
      <TouchableOpacity
        style={styles.wardrobeButton}
        onPress={() => router.replace('/(tabs)/wardrobe')}>
        <Hanger style={styles.hangerIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#494368',
  },
  planetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  earthBase: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    position: 'absolute',
    bottom: -Dimensions.get('window').width * 0,
  },
  earthOverlay: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    position: 'absolute',
    bottom: -Dimensions.get('window').width * 0,
    zIndex: 0,
  },
  alienContainer: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  alien: {
    width: 128.63,
    height: 230.74,
  },
  speechBubble: {
    backgroundColor: '#FDFFF3',
    borderRadius: 45,
    padding: 10,
    marginBottom: 10,
    position: 'absolute',
    top: -150,
    width: 253,
    height: 106.43,
  },
  speechText: {
    fontSize: 22,
    fontFamily: 'BrunoAce_400Regular',
    color: '#000',
    textAlign: 'center',
    top: 30,
  },
  speechTail: {
    position: 'absolute',
    width: 34.51,
    height: 36.52,
    top: -50,
    left: -10,
    zIndex: 1,
  },
  playButton: {
    position: 'absolute',
    bottom: '20%',
    alignSelf: 'center',
    width: 226,
    height: 57,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(7, 35, 111, 0.61)',
  },
  playButtonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'BrunoAce_400Regular',
  },
  wardrobeButton: {
    position: 'absolute',
    top: '40%',
    width: 58,
    height: 67,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 45,
    borderBottomRightRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 10,
  },
  hangerIcon: {
    width: 25,
    height: 22,
  },
});
