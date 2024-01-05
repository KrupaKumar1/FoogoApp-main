/* eslint-disable prettier/prettier */
module.exports = {
  dependencies: {
    ...(process.env.NO_FLIPPER
      ? {'react-native-flipper': {platforms: {ios: null}}}
      : {}),
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'],
};
