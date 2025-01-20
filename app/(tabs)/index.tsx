import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { avatar001 } from '@/constants/avatars';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Player Card */}
        <View style={styles.playerCard}>
          <View style={styles.avatarSection}>
            <Image
              source={avatar001}
              style={styles.avatar}
            />
            <ThemedText style={styles.username}>Sofien</ThemedText>
            <View style={styles.levelBadge}>
              <ThemedText style={styles.levelText}>Level 44</ThemedText>
            </View>
          </View>
          
          <View style={styles.statsSection}>
            <View style={styles.statColumn}>
              <ThemedText style={styles.statValue}>368,014</ThemedText>
              <ThemedText style={styles.statLabel}>Total Score</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statColumn}>
              <ThemedText style={styles.statValue}>14.3%</ThemedText>
              <ThemedText style={styles.statLabel}>Win Rate</ThemedText>
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    paddingBottom: 90, // Added space for bottom tab bar
  },
  playerCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
  },
  avatarSection: {
    alignItems: 'center',
    flex: 1,
  },
  statsSection: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  levelBadge: {
    backgroundColor: '#2C8A3D',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statColumn: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#eee',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C8A3D',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  gameButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  gameButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
