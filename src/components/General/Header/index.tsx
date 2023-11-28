import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import DotIcon from 'react-native-vector-icons/Entypo';

const Header = () => {
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => console.log('Back pressed')}>
        <Icon name="bars-staggered" size={25} color="black" />
      </TouchableOpacity>
      <Image
        style={styles.companyImage}
        source={{
          uri: 'https://verasquare.in/de24fa636c14c2d9a7a2408ac66792fc.png',
        }}
      />
      <DotIcon
        style={styles.dotIcon}
        name="dots-three-vertical"
        size={25}
        color="black"
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    maxHeight: 60,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  companyImage: {
    height: 30,
    width: 100,
    objectFit: 'contain',
    paddingLeft: 30,
  },
  dotIcon: {
    marginLeft: 'auto',
  },
});
