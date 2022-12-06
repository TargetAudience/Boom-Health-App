module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@react-native-community/masked-view': '@react-native-masked-view/masked-view'
        }
      }
    ],
    'react-native-reanimated/plugin',
  ]
};
