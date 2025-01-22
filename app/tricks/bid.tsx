import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useGameStore from '@/store/gameStore'
import GameTable from '@/components/game/GameTable'
import { distributeCards } from '@/utils/distributeCards'
import { useBidStore } from '@/store/bidStore'

const Bid = () => {
  const { setTrickStep, setGame, game } = useGameStore()
  const { setIsDealing } = useBidStore();

  useEffect(() => {
    setIsDealing(true);
    const players = distributeCards();
    setGame({
      ...game,
      north: players.north,
      east: players.east,
      south: players.south,
      west: players.west
    });
    setTimeout(() => {
      setIsDealing(false);
    }, 2000);
  }, []);

  return (
    <GameTable newGame={true}/>
  )
}

export default Bid

const styles = StyleSheet.create({})