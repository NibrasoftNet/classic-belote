import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useGameStore } from '../../store/gameStore';
import { Link, useRouter } from 'expo-router';

const GameTable: React.FC = () => {
  const { tricksStep } = useGameStore();
  const router = useRouter();

  React.useEffect(() => {
    if (tricksStep === 'initial') {
      router.push(`/tricks/trick/${tricksStep}`);
    }
    if (tricksStep === 'bid') {
      router.push(`/tricks/bid`);
    }
    if (tricksStep === 'trick1') {
      router.push(`/tricks/trick/1`);
    }
    if (tricksStep === 'trick2') {
      router.push(`/tricks/trick/2`);
    }
    if (tricksStep === 'trick3') {
      router.push(`/tricks/trick/3`);
    }
    if (tricksStep === 'trick4') {
      router.push(`/tricks/trick/4`);
    }
    if (tricksStep === 'trick5') {
      router.push(`/tricks/trick/5`);
    }
    if (tricksStep === 'trick6') {
      router.push(`/tricks/trick/6`);
    }
    if (tricksStep === 'trick7') {
      router.push(`/tricks/trick/7`);
    }
    if (tricksStep === 'last') {
      router.push(`/tricks/last`);
    }
  }, [tricksStep]);

  return (
    <View style={styles.container}>
      <Link href="/tricks/initial" />
      <Link href="/tricks/bid" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c8a3d', // Green table color
  },
});

export default GameTable;
