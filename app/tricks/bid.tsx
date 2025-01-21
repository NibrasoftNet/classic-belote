import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useGameStore from '@/store/gameStore'
import GameTable from '@/components/game/GameTable'
import { distributeCards } from '@/utils/distributeCards'

const bid = () => {
  const { setTrickStep, setGame, game } = useGameStore()

  useEffect(() => {
    const players = distributeCards();
    console.log("tessssss", players.north.availableCards)
    setGame({
      ...game,
      north: players.north,
      east: players.east,
      south: players.south,
      west: players.west
    });
  }, []);

  return (
    <GameTable />
  )
}

export default bid

const styles = StyleSheet.create({})