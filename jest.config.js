module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(?:@react-native(?:-community)?|@react-navigation|@react-native-async-storage|react-native(?:-.*)?)/)',
  ],
};
