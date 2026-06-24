import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from '@react-navigation/native';

export const FlowPilotDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#0f172a',
    card: '#1e293b',
    text: '#e2e8f0',
    border: '#334155',
  },
};

export const FlowPilotLightTheme = {
  ...NavigationLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    background: '#b7c7dd',   // soft blue-gray
    card: '#e8dd72',         // aged paper yellow
    text: '#1a1c23',         // dark slate
    border: '#aeb8c4',       // cool neutral border
  },
};
