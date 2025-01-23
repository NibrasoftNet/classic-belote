import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlayerAvatar from './PlayerAvatar';
import { PlayerCardsType, PlayersScoreCardProps } from '@/types';
import { avatar001, avatar002, avatar003, avatar004 } from '@/constants/avatars';

const PlayersScoreCard: React.FC<PlayersScoreCardProps> = ({ players }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <PlayerAvatar
          player={players.north}
          position="north"
          avatar={players.north.avatar}
        />
        <PlayerAvatar
          player={players.south}
          position="east"
          avatar={players.south.avatar}
        />
      </View>
      <View style={styles.row}>
        <PlayerAvatar
          player={players.west}
          position="west"
          avatar={players.west.avatar}
        />
        <PlayerAvatar
          player={players.east}
          position="east"
          avatar={players.east.avatar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 1,
    right: 100,
    backgroundColor: 'rgba(139, 0, 0, 0.9)',
    borderRadius: 10,
    padding: 10,
    zIndex: 10,
    flexDirection: 'column',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
});

export default PlayersScoreCard;
