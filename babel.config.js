module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@shared': './src/shared',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
