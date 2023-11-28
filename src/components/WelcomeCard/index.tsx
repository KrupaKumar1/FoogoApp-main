import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Images from '../../constant/Images';
import Display from '../../utils/Display';
import Font from '../../constant/Font';



interface CardProps {
  title: string;
  image: any;
  content: string;
}

const WelcomeCard = ({ title, image, content }: CardProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Images[image]} resizeMode="contain" />
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

export default WelcomeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(100),
  },
  text: {
    fontSize: 22,
    fontFamily: Font.POPPINS_BOLD,
  },
  content: {
    fontSize: 18,
    fontFamily: Font.POPPINS_LIGHT,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
});