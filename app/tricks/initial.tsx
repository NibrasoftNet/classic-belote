import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import useGameStore from '@/store/gameStore';
import { Picker } from '@react-native-picker/picker';

export default function Initial() {
  const [winningScore, setWinningScore] = useState('');
  const router = useRouter();
  const { setTrickStep, setGame ,game } = useGameStore()

  const handleSubmit = () => {
    const score = parseInt(winningScore);
    if (score >= 1000 && score <= 2000)  {
      console.log('Winning score:', score);
      setTrickStep('bid')
      setGame({...game,     
        gameWinningType: {
        type: "rounds",
        winningScore: score,
        winningRound: null,
      },})
      router.push('/tricks/bid');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Set Winning Score</Text>
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={winningScore}
            onValueChange={(itemValue) => setWinningScore(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="1000 points" value="1000" />
            <Picker.Item label="1500 points" value="1500" />
            <Picker.Item label="2000 points" value="2000" />
          </Picker>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            !winningScore && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!winningScore}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1B4332'
  },
  card: {
    backgroundColor: '#2D6A4F',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center'
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
    overflow: 'hidden'
  },
  picker: {
    width: '100%',
    height: 50
  },
  button: {
    backgroundColor: '#52B788',
    padding: 15,
    borderRadius: 8,
    width: '100%'
  },
  buttonDisabled: {
    backgroundColor: '#95D5B2',
    opacity: 0.7
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
