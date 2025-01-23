import React from 'react';
import { View, StyleSheet } from 'react-native';
import useGameStore from '@/store/gameStore';

const CenterCards: React.FC = () => {
  const { game } = useGameStore();

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3].map((index) => (
        <View key={index} style={styles.emptyCard} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -150 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emptyCard: {
    width: 70,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF50',
    backgroundColor: 'transparent',
  },
});

export default CenterCards;
