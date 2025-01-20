import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface PlayerProps {
  position: 'north' | 'south' | 'east' | 'west';
  name: string;
  cardCount: number;
  isActive: boolean;
}

const Player: React.FC<PlayerProps> = ({ position, name, cardCount, isActive }) => {
  const getPositionStyle = () => {
    switch (position) {
      case 'north':
        return styles.north;
      case 'south':
        return styles.south;
      case 'east':
        return styles.east;
      case 'west':
        return styles.west;
    }
  };

  return (
    <View style={[styles.container, getPositionStyle(), isActive && styles.active]}>
      <View style={styles.avatar}>
        <FontAwesome name="user-circle" size={40} color={isActive ? "#ffd700" : "#fff"} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.cardCount}>{cardCount} cards</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    minWidth: 100,
  },
  north: {
    top: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  south: {
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  east: {
    right: 20,
    top: '50%',
    transform: [{ translateY: -50 }],
  },
  west: {
    left: 20,
    top: '50%',
    transform: [{ translateY: -50 }],
  },
  avatar: {
    marginBottom: 5,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardCount: {
    color: '#fff',
    fontSize: 14,
  },
  active: {
    borderColor: '#ffd700',
    borderWidth: 2,
  },
});

export default Player;
