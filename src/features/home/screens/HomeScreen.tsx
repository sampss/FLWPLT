import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme(); // ← get active theme colors

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Text style={[styles.menuIcon, { color: theme.colors.text }]}>☰</Text>
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Flow Pilot
        </Text>

        <View style={styles.rightSpacer} />
      </View>

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
