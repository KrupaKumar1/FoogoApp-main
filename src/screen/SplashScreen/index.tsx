import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Color from '../../constant/Color';
import Display from '../../utils/Display';
import Font from '../../constant/Font';
import Images from '../../constant/Images';


const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 2000);
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Color.DEFAULT_GREEN}
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
    backgroundColor: Color.DEFAULT_GREEN,
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