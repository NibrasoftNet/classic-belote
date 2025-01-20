import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  translateX: Animated.Value;
}

export function Sidebar({ isVisible, onClose, translateX }: SidebarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const menuItems = [
    { icon: 'settings-outline', text: 'Settings', onPress: () => console.log('Settings pressed') },
    { icon: 'help-circle-outline', text: 'Help', onPress: () => console.log('Help pressed') },
    { icon: 'chatbubble-outline', text: 'Comments', onPress: () => console.log('Comments pressed') },
    { icon: 'exit-outline', text: 'Exit', onPress: () => router.replace('/') },
  ];

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.overlayBackground} onPress={onClose} />
      <Animated.View
        style={[
          styles.sidebar,
          {
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
            transform: [{ translateX }],
          },
        ]}>
        <View style={styles.header}>
          <ThemedText style={styles.headerText}>Menu</ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={isDark ? '#ffffff' : '#000000'} />
          </TouchableOpacity>
        </View>
        <View style={styles.menuItems}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}>
              <Ionicons
                name={item.icon as any}
                size={24}
                color={isDark ? '#ffffff' : '#000000'}
              />
              <ThemedText style={styles.menuText}>{item.text}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '70%',
    height: '100%',
    maxWidth: 300,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  menuItems: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 20,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
  },
});
