import React, { useEffect } from 'react';
import { StyleSheet, View, Platform, StatusBar as RNStatusBar } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import GameTable from '../../components/game/GameTable';

export default function OnlineScreen() {
  useEffect(() => {
    // Lock the screen to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Hide the navigation bar on Android
    if (Platform.OS === 'android') {
      RNStatusBar.setHidden(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <GameTable />
      <RNStatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C8A3D',
  },
});
