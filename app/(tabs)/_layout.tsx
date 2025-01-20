import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useSegments } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();

  const hideTabBar = [...segments].includes('online') || [...segments].includes('offline');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2C8A3D',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#ccc' : '#666',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          height: "15%",
          width: "100%",
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#333' : '#eee',
          display: hideTabBar ? 'none' : 'flex',
          flexDirection: 'column', // Change to column to stack items vertically
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
          paddingBottom: 10,
        },
        tabBarItemStyle: {
          height: 60,
          paddingTop: 5,
          justifyContent: 'center', // Center items vertically
          alignItems: 'center', // Center items horizontally
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 5,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="online"
        options={{
          title: 'Online',
          tabBarIcon: ({ color }) => <Ionicons name="globe" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="offline"
        options={{
          title: 'Offline',
          tabBarIcon: ({ color }) => <Ionicons name="cloud-offline" size={28} color={color} />,
        }}
      />
        <Tabs.Screen
          name="tournament"
          options={{
            title: 'Cup',
            tabBarIcon: ({ color }) => <Ionicons name="trophy" size={28} color={color} />,
          }}
        />
    </Tabs>
  );
}