import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import AppHeader from '@shared_components/AppHeader';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme(); // ← get active theme colors

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* Header */}
      <AppHeader title="Flow Pilot" />

      {/* Feed 1: Tasks */}
      <View style={[styles.feedBlock, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.feedTitle, { color: theme.colors.text }]}>Tasks</Text>
        <Text style={[styles.feedItem, { color: theme.colors.text }]}>• No tasks yet</Text>
      </View>

      {/* Feed 2: Schedule */}
      <View style={[styles.feedBlock, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.feedTitle, { color: theme.colors.text }]}>Schedule</Text>
        <Text style={[styles.feedItem, { color: theme.colors.text }]}>• No appointments</Text>
      </View>

      {/* Feed 3: Today */}
      <View style={[styles.feedBlock, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.feedTitle, { color: theme.colors.text }]}>Today</Text>
        <Text style={[styles.feedItem, { color: theme.colors.text }]}>• Nothing scheduled</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  feedBlock: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  feedTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },

  feedItem: {
    fontSize: 14,
  },
});
