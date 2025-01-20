import React, { useEffect } from 'react';
import { StyleSheet, View, Platform, StatusBar as RNStatusBar, Text, TouchableOpacity, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRouter } from 'expo-router';
import { avatar001 } from '../../constants/avatars';

export default function OfflineScreen() {
  const router = useRouter();
  const wins = 10;
  const losses = 20;

  useEffect(() => {
    // Lock the screen to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Hide the navigation bar on Android
    if (Platform.OS === 'android') {
      RNStatusBar.setHidden(true);
    }
  }, []);

  const handleNewGame = () => {
    router.push('/tricks/initial');
  };

  const handleContinueGame = () => {
    // TODO: Implement continue game functionality
    console.log('Continue game clicked');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleNewGame}
        >
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleContinueGame}
        >
          <Text style={styles.buttonText}>Continue Game</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightPanel}>
        <View style={styles.avatarContainer}>
          <Image
            source={avatar001}
            style={styles.avatar}
          />
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Wins: {wins}</Text>
          <Text style={styles.statsText}>Losses: {losses}</Text>
        </View>
      </View>
      <RNStatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C8A3D',
    flexDirection: 'row',
  },
  leftPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  rightPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#1E5E2A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#1E5E2A',
  },
  statsContainer: {
    alignItems: 'center',
  },
  statsText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
  },
});
