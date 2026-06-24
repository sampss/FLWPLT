import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from './AppNavigator';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SettingsScreen } from '@features/settings/screens/SettingsScreen';

const Drawer = createDrawerNavigator();

// Drawer placeholder screens
const ProfileScreen = () => <Text style={{ marginTop: 50 }}>User Profile</Text>;
const LegalScreen = () => <Text style={{ marginTop: 50 }}>Legal Statements</Text>;
const DonateScreen = () => <Text style={{ marginTop: 50 }}>Donate to FlowPilot</Text>;

export default function RootNavigator() {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // we use our own header
        drawerStyle: {
        backgroundColor: theme.colors.background,
        },
        drawerActiveTintColor: theme.colors.text,
        drawerInactiveTintColor: theme.colors.text,
      }}
    >
      <Drawer.Screen name="FlowPilot" component={AppNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Legal" component={LegalScreen} />
      <Drawer.Screen name="Donate" component={DonateScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
