import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CardProps {
  rank: string;
  suit: string;
  faceUp?: boolean;
  isPlayable?: boolean;
  onPress?: () => void;
  style?: any;
}

const Card: React.FC<CardProps> = ({ rank, suit, faceUp = true, isPlayable = false, onPress, style }) => {
  const getSuitColor = () => {
    return ['♥', '♦'].includes(suit) ? '#FF0000' : '#000000';
  };

  const CardContent = () => {
    if (!faceUp) {
      return (
        <View style={styles.cardBack}>
          <Text style={styles.cardBackPattern}>🎴</Text>
        </View>
      );
    }

    const suitColor = getSuitColor();

    return (
      <View style={[styles.card, isPlayable && styles.playableCard]}>
        {/* Background suit */}
        <Text style={[styles.backgroundSuit, { color: suitColor + '20' }]}>{suit}</Text>
        
        {/* Top left number */}
        <View style={styles.topLeft}>
          <Text style={[styles.rank, { color: suitColor }]}>{rank}</Text>
        </View>

        {/* Top right suit */}
        <View style={styles.topRight}>
          <Text style={[styles.suit, { color: suitColor }]}>{suit}</Text>
        </View>
        
        {/* Bottom left suit */}
        <View style={styles.bottomLeft}>
          <Text style={[styles.suit, { color: suitColor, transform: [{ rotate: '180deg' }] }]}>{suit}</Text>
        </View>

        {/* Bottom right number */}
        <View style={styles.bottomRight}>
          <Text style={[styles.rank, { color: suitColor, transform: [{ rotate: '180deg' }] }]}>{rank}</Text>
        </View>
      </View>
    );
  };

  if (!isPlayable || !onPress) {
    return <View style={[styles.container, style]}><CardContent /></View>;
  }

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress}
      disabled={!isPlayable}
    >
      <CardContent />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    margin: 5,
    overflow: 'visible',
    // Add shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardBack: {
    width: 70,
    height: 100,
    backgroundColor: '#0066CC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    // Add shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backgroundSuit: {
    position: 'absolute',
    fontSize: 80,
    opacity: 0.1,
    alignSelf: 'center',
    top: '50%',
    transform: [{ translateY: -40 }], // Half of fontSize to center
  },
  topLeft: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  topRight: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    transform: [{ rotate: '180deg' }],
  },
  bottomRight: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    transform: [{ rotate: '180deg' }],
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  suit: {
    fontSize: 20,
    lineHeight: 20,
  },
  cardBackPattern: {
    fontSize: 36,
  },
  container: {
    width: 70,
    height: 100,
  },
  playableCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Card;
