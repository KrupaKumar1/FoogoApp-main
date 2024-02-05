import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Color from '../../constant/Color';
import Display from '../../utils/Display';
import Font from '../../constant/Font';
import Images from '../../constant/Images';

const SplashScreen = () => {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const updateOrientation = () => {
      const {width, height} = Dimensions.get('screen');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    Dimensions.addEventListener('change', updateOrientation);
    return () => Dimensions.removeEventListener('change', updateOrientation);
  }, []);

  return (
    <View
      style={[
        styles.container,
        orientation === 'landscape' && styles.landscapeContainer,
      ]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Color.PRIMARY}
        translucent
      />
      <Image style={styles.logo} source={Images.PLATE} resizeMode="contain" />
      <Text style={styles.text}>Restrozap POS</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.PRIMARY,
    width: '100%',
    height: '100%', // Set the height to 100% to take the full height of the screen
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.PRIMARY,
    width: '100%',
    height: '100%',
  },
  logo: {
    width: Display.setWidth(60),
    height: Display.setHeight(30),
  },
  text: {
    fontSize: 32,
    fontFamily: Font.POPPINS_LIGHT,
    color: Color.DEFAULT_WHITE,
  },
});
