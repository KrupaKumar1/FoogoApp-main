import {StyleSheet} from 'react-native';
import Color from '../../../constant/Color';
import Display from '../../../utils/Display';
import {Colors} from '../../../CSS/GlobalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorWhitesmoke_100,
  },

  ordersListContainer: {
    height: Display.setHeight(70),
  },

  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  menuText: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 15,
  },
  filterIconContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  searchIcon: {
    paddingRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  disabled: {
    backgroundColor: '#bdc3c7',
  },
  orderContainer: {
    width: Display.setWidth(100),
    padding: 10,
  },
  newOrderButton: {
    backgroundColor: Color.PRIMARY,
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    margin: 13,
  },
});
