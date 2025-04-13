import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = () => {
    // логика регистрации
    // после регистрации переходим на логин
    router.push('/(auth)/login');
  };

  const handleGoToLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign up</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
          <Text style={styles.signUpButtonText}>Зарегистрироваться</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Уже есть аккаунт? </Text>
          <TouchableOpacity onPress={handleGoToLogin}>
            <Text style={styles.loginLink}>Войти</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
            style={[styles.socialIcon, { tintColor: 'white' }]}
          />
          <Text style={styles.socialButtonText}>Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appleButton}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/0/747.png' }}
            style={[styles.socialIcon, { tintColor: 'white' }]}
          />
          <Text style={[styles.socialButtonText, styles.appleButtonText]}>Sign up with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: 343,
    height: 475,
    borderRadius: 30,
    padding: 30,
    borderWidth: 1,
    borderColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 28,
    fontFamily: 'Inter',
  },
  label: {
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
  },
  signUpButton: {
    backgroundColor: '#d9d9d9',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 100,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 7,
  },
  signUpButtonText: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  loginText: {
    fontSize: 12,
    color: '#000',
  },
  loginLink: {
    fontSize: 12,
    color: '#000',
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
