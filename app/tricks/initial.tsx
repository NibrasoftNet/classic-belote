import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Initial() {
  const [winningScore, setWinningScore] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    const score = parseInt(winningScore);
    if (score >= 1000 && score <= 2000) {
      console.log('Winning score:', score);
      
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Set Winning Score</Text>
        <TextInput
          style={styles.input}
          value={winningScore}
          onChangeText={setWinningScore}
          keyboardType="numeric"
          placeholder="Enter score (1000-2000)"
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={[
            styles.button,
            (!winningScore || parseInt(winningScore) < 1000 || parseInt(winningScore) > 2000) && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!winningScore || parseInt(winningScore) < 1000 || parseInt(winningScore) > 2000}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c8a3d', // Green table color
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#f8f9fa',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
