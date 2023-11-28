import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Color from '../../constant/Color';
import Display from '../../utils/Display';
import Font from '../../constant/Font';
import Images from '../../constant/Images';
import {NavigationProp} from '@react-navigation/native';

const SplashScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const isLogin = false;
  useEffect(() => {
    setTimeout(() => {
      isLogin ? navigation.navigate('Main') : navigation.navigate('Auth');
    }, 2000);
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Color.PRIMARY}
        translucent
      />
      <Image style={styles.logo} source={Images.PLATE} resizeMode="contain" />
      <Text style={styles.text}>Foo Go</Text>
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
