import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';

import { AuthService } from '@/services/AuthService';
import { logout } from '@/store/reducers/auth.reducer';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';

// SVG imports
import FirstContact from '@/assets/profile/first_contact.svg';
import CuriousExplorer from '@/assets/profile/curious_explorer.svg';
import EarthlingBeginner from '@/assets/profile/earthing_beginner.svg';
import Avatar from '@/assets/profile/photo_profile.svg';
import StarIcon from '@/assets/profile/star.svg';
import PencilIcon from '@/assets/profile/pencil.svg';
import BackgroundImage from '@/assets/profile/background_profile.png';

export default function TabTwoScreen() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ImageBackground
      source={BackgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Аватар */}
        <View style={styles.avatarContainer}>
          <Avatar width={124} height={124} />
        </View>

        {/* Карточка профиля */}
        <View style={styles.card}>
          {/* Имя */}
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Vanya Ivanov</Text>
            <PencilIcon width={24} height={24} />
          </View>
          {/* Почта */}
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>example@gmail.com</Text>
            <PencilIcon width={24} height={24} />
          </View>
          {/* Пароль */}
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>********</Text>
            <PencilIcon width={24} height={24} />
          </View>

          {/* Achievements */}
          <Text style={styles.achievementsTitle}>achievements</Text>
          <View style={styles.achievementsContainer}>
            <View style={styles.achievement}>
              <FirstContact width={88} height={84} />
              <Text style={styles.achievementText}>First Contact</Text>
            </View>
            <View style={styles.achievement}>
              <CuriousExplorer width={88} height={84} />
              <Text style={styles.achievementText}>Curious Explorer</Text>
            </View>
            <View style={styles.achievement}>
              <EarthlingBeginner width={88} height={84} />
              <Text style={styles.achievementText}>Earthling Beginner</Text>
            </View>
          </View>

          {/* Stars */}
          <View style={styles.starsRow}>
            <View style={styles.starDisplay}>
              <Text style={styles.starsText}>90</Text>
              <StarIcon width={33} height={32} />
            </View>
            {/* Кнопка Выйти */}
            <TouchableOpacity
              onPress={async () => {
                await AuthService.logout();
                dispatch(logout());
              }}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    marginTop: 60,
    marginBottom: 26,
    padding: 0,
    borderRadius: 100,
  },
  card: {
    width: 343,
    height: 456,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },
  infoText: {
    fontSize: 18,
    color: '#312A54',
  },
  achievementsTitle: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 12,
    fontFamily: 'BrunoAce_400Regular',
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  achievement: {
    alignItems: 'center',
    width: 80,
  },
  achievementText: {
    fontSize: 8,
    textAlign: 'center',
    marginTop: 4,
  },
  starsRow: {
    marginTop: 20,
    alignItems: 'center',
  },
  starDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  starsText: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'BrunoAce_400Regular',
  },
  buyButton: {
    backgroundColor: '#658BF5',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    width: 273, 
    height: 39,
  },
  buyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#658BF5',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 100,
    marginBottom: 40,
    width: 273, 
    height: 39,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
