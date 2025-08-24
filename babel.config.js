module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel' // ✅ Must be in presets, not plugins
    ],
    plugins: [
      //expo-router/babel', // ✅ Needed for expo-router
      'react-native-reanimated/plugin' // (optional, but often needed)
    ],
  };
};
