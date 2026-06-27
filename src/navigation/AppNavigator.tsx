import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '@features/home/screens/HomeScreen';
import   TasksScreen  from '@features/tasks/screens/TaskListScreen';

// --- Move ALL components OUTSIDE the navigator ---
const ScheduleScreen = () => (
  <Text style={{ marginTop: 50 }}>📅 Schedule Coming Soon</Text>
);

const TimeClockScreen = () => (
  <Text style={{ marginTop: 50 }}>⏱️ Time Clock Coming Soon</Text>
);

const VoiceScreen = () => (
  <Text style={{ marginTop: 50 }}>🎤 Voice Commands Coming Soon</Text>
);

// --- Move ALL icons OUTSIDE too ---
const HomeIcon = () => <Text>🏠</Text>;
const TasksIcon = () => <Text>📝</Text>;
const ScheduleIcon = () => <Text>📅</Text>;
const TimeClockIcon = () => <Text>⏱️</Text>;
const VoiceIcon = () => <Text>🎤</Text>;

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: HomeIcon }}
      />

      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{ tabBarIcon: TasksIcon }}
      />

      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ tabBarIcon: ScheduleIcon }}
      />

      <Tab.Screen
        name="TimeClock"
        component={TimeClockScreen}
        options={{ tabBarIcon: TimeClockIcon }}
      />

      <Tab.Screen
        name="Voice"
        component={VoiceScreen}
        options={{ tabBarIcon: VoiceIcon }}
      />
    </Tab.Navigator>
  );
}
