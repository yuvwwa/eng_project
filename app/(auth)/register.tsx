import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { register } from '@/store/reducers/auth.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import Alien from '@/assets/form/form_alien.svg';

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.authReducer,
  );

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    const resultAction = await dispatch(register({ email, password }));
    if (!register.fulfilled.match(resultAction)) {
      Alert.alert('Ошибка', error || 'Ошибка регистрации');
    }
  };

  const handleGoToLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Alien style={styles.overlayImage} />
      <View style={styles.card}>
        <Text style={styles.title}>Sign up</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleRegister}
          disabled={loading}>
          <Text style={styles.signUpButtonText}>
            {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Уже есть аккаунт? </Text>
          <TouchableOpacity onPress={handleGoToLogin}>
            <Text style={styles.loginLink}>Войти</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
            }}
            style={[styles.socialIcon, { tintColor: 'white' }]}
          />
          <Text style={styles.socialButtonText}>Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appleButton}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/0/747.png' }}
            style={[styles.socialIcon, { tintColor: 'white' }]}
          />
          <Text style={[styles.socialButtonText, styles.appleButtonText]}>
            Sign up with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CEEC97',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayImage: {
    width: 393,
    height: 297,
    position: 'absolute',
    top: 0,
  },
  card: {
    backgroundColor: '#FDFFF3',
    width: 343,
    height: 475,
    borderRadius: 30,
    padding: 30,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 28,
    fontFamily: 'BrunoAce_400Regular',
    color: '#312A54',
  },
  label: {
    color: '#312A54',
    marginBottom: 7,
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  input: {
    height: 39,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 100,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  signUpButton: {
    backgroundColor: '#312A54',
    borderRadius: 100,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 7,
  },
  signUpButtonText: {
    fontSize: 15,
    color: '#FDFFF3',
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  loginText: {
    fontSize: 12,
    color: '#312A54',
  },
  loginLink: {
    fontSize: 12,
    color: '#312A54',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    borderRadius: 50,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  appleButton: {
    backgroundColor: '#000',
    borderRadius: 50,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  appleButtonText: {
    color: '#fff',
  },
  socialIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
