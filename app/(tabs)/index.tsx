import { View, Text, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Привет из React Native 👋</Text>
      <Text style={styles.counter}>Счётчик: {count}</Text>
      <Button title="Нажми меня" onPress={() => setCount(count + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#00FFAA',
    marginBottom: 16,
  },
  counter: {
    fontSize: 36,
    color: '#fff',
    marginBottom: 16,
  },
});
