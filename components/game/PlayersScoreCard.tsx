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
          avatar={avatar001}
        />
        <PlayerAvatar
          player={players.south}
          position="east"
          avatar={avatar002}
        />
      </View>
      <View style={styles.row}>
        <PlayerAvatar
          player={players.west}
          position="west"
          avatar={avatar003}
        />
        <PlayerAvatar
          player={players.east}
          position="east"
          avatar={avatar004}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5,
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
