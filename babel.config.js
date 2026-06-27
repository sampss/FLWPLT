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
          '@shared_components': './src/shared/components',
          '@shared': './src/shared',
          '@typesafe': './src/typesafe',
          '@tasks': './src/features/tasks',
          '@task_components': './src/features/tasks/components',
          '@shared_services': './src/shared/services',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
