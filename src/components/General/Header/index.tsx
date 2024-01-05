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
import Display from '../../../utils/Display';
import {useDispatch} from 'react-redux';
import {GeneralAction} from '../../../services/redux/actions';

const Header = () => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    console.log('LOGEDOUT');
    dispatch(GeneralAction.logOut());
  };
  return (
    <View style={styles.main}>
      <TouchableOpacity>
        <Icon name="bars-staggered" size={25} color="black" />
      </TouchableOpacity>
      <Image
        style={styles.companyImage}
        source={{
          uri: 'https://verasquare.in/de24fa636c14c2d9a7a2408ac66792fc.png',
        }}
      />
      <DotIcon
        onPress={() => logOutHandler()}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    height: Display.setHeight(5),
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 4,
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
    // Remove paddingLeft: 30,
  },
  dotIcon: {
    // Remove marginLeft: 'auto',
  },
});
