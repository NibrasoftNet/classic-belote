import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CardSuitsRedBackground: React.FC = () => {
  const getRandomSuit = (): 'cards-club-outline' | 'cards-diamond-outline' | 'cards-heart-outline' | 'cards-spade-outline' => {
    const suits = ['cards-club-outline', 'cards-diamond-outline', 'cards-heart-outline', 'cards-spade-outline'] as const;
    return suits[Math.floor(Math.random() * suits.length)];
  };

  return (
    <View style={styles.backgroundPattern}>
      {[...Array(15).keys()].map((rowIndex) => (
        <View key={rowIndex} style={styles.patternRow}>
          {[...Array(10).keys()].map((colIndex) => (
            <MaterialCommunityIcons
              key={`${rowIndex}-${colIndex}`}
              name={getRandomSuit()}
              size={40}
              color="rgba(128, 128, 128, 0.5)"
              style={styles.suitIcon}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
  },
  patternRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  suitIcon: {
    transform: [{ rotate: '45deg' }],
  },
});

export default CardSuitsRedBackground;
