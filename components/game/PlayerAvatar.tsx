import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { PlayerType } from '@/types/player';

interface PlayerAvatarProps {
  player: PlayerType;
  position: 'west' | 'north' | 'east';
  avatar: ImageSourcePropType;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ player, position, avatar }) => {
  return (
    <View style={[styles.container, styles[position]]}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.score}>Score: {player.score}</Text>
        <Text style={styles.cardCount}>Cards: {player.availableCards.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    padding: 10,
  },
  west: {
    left: 20,
    top: '50%',
    transform: [{ translateY: -50 }],
  },
  north: {
    top: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  east: {
    right: 20,
    top: '50%',
    transform: [{ translateY: -50 }],
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  infoContainer: {
    alignItems: 'center',
  },
  score: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 2,
  },
  cardCount: {
    color: '#fff',
    fontSize: 12,
  },
});

export default PlayerAvatar;
