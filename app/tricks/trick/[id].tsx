import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const TricksRound = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
    <View>
        <Text>[id]</Text>
    </View>
  )
}

export default TricksRound

const styles = StyleSheet.create({})