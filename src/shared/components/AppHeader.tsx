import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  title: string;
  rightElement?: React.ReactNode;
}

const AppHeader: React.FC<Props> = ({ title, rightElement }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 8,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Pressable onPress={() => navigation.openDrawer()}>
        <Text style={[styles.menuIcon, { color: theme.colors.text }]}>☰</Text>
      </Pressable>

      <Text style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>

      <View style={styles.rightSlot}>
        {rightElement}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 32,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
  },
  rightSlot: {
    width: 48,
    alignItems: 'flex-end',
  },
});
