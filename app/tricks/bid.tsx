import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useGameStore } from '../../store/gameStore';
import { useRouter } from 'expo-router';

export default function Bid() {
  const { makeBid, currentBid, passedPlayers } = useGameStore();
  const router = useRouter();

  const suits = ['♠', '♥', '♦', '♣'];
  const baseValues = [80, 90, 100, 110, 120, 130, 140, 150, 160];

  const handleBid = (suit: string, value: number) => {
    makeBid('south', suit as any, value);
  };

  const handlePass = () => {
    makeBid('south');
  };

  const isValidBid = (value: number) => {
    return !currentBid || value > currentBid.value;
  };

  return (
    <View style={styles.container}>
      {/* Current Bid Display */}
      {currentBid && (
        <View style={styles.currentBidContainer}>
          <Text style={styles.currentBidText}>
            Current Bid: {currentBid.value} {currentBid.suit} by {currentBid.player}
          </Text>
        </View>
      )}

      {/* Pass Button */}
      <TouchableOpacity 
        style={[styles.passButton]} 
        onPress={handlePass}
      >
        <Text style={styles.passButtonText}>Pass</Text>
      </TouchableOpacity>

      {/* Bid Options */}
      <ScrollView style={styles.bidOptionsContainer}>
        <View style={styles.bidGrid}>
          {baseValues.map((value) => (
            <View key={value} style={styles.bidRow}>
              {suits.map((suit) => (
                <TouchableOpacity
                  key={`${value}-${suit}`}
                  style={[
                    styles.bidButton,
                    !isValidBid(value) && styles.bidButtonDisabled
                  ]}
                  onPress={() => handleBid(suit, value)}
                  disabled={!isValidBid(value)}
                >
                  <Text style={styles.bidButtonText}>
                    {value} {suit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Passed Players Display */}
      <View style={styles.passedPlayersContainer}>
        <Text style={styles.passedPlayersText}>
          Passed: {Array.from(passedPlayers).join(', ')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c8a3d',
    padding: 20,
  },
  currentBidContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  currentBidText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  passButton: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  passButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bidOptionsContainer: {
    flex: 1,
  },
  bidGrid: {
    flexDirection: 'column',
    gap: 10,
  },
  bidRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  bidButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bidButtonDisabled: {
    backgroundColor: '#ccc',
  },
  bidButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passedPlayersContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  passedPlayersText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});