import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { useNavigation, useTheme } from '@react-navigation/native';
import AppHeader from '@shared_components/AppHeader';

export const SettingsScreen = () => {
  const { manualTheme, setManualTheme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const theme = useTheme(); // ← get active theme colors

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* HEADER ROW */}
      <AppHeader title="Settings"  />

      {/* Content */}
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Appearance
        </Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Dark Mode
        </Text>

        <Switch
          value={manualTheme === 'dark' || (manualTheme === null && theme.dark)}
          onValueChange={(value) => setManualTheme(value ? 'dark' : 'light')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  menuButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  menuIcon: {
    fontSize: 26,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
  },

  rightSpacer: {
    width: 40,
  },

  sectionTitle: {
    fontSize: 20,
    marginBottom: 20,
  },

  label: {
    marginBottom: 10,
    fontSize: 16,
  },
});
