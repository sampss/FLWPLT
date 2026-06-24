import React, { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider, ThemeContext } from './src/theme/ThemeContext';
import { FlowPilotDarkTheme, FlowPilotLightTheme } from './src/theme/FlowPilotTheme';
import RootNavigator from './src/navigation/RootNavigator';

function AppInner() {
  const systemTheme = useColorScheme();
  const { manualTheme } = useContext(ThemeContext);

  const activeTheme = manualTheme ?? systemTheme;

  return (
    <NavigationContainer
      theme={activeTheme === 'dark' ? FlowPilotDarkTheme : FlowPilotLightTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppInner />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
