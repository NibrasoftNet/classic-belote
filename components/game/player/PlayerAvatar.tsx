import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { PlayerAvatarType } from '@/types';

const PlayerAvatar: React.FC<PlayerAvatarType> = ({ player, position, avatar }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={avatar} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.score}>{player.score}</Text>
        <Text style={styles.team}>{player.team}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    gap: 8,
  },
  avatarWrapper: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    backgroundColor: '#8B0000',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  score: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  team: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
});

export default PlayerAvatar;
