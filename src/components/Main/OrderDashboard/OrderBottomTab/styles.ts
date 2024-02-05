import {StyleSheet} from 'react-native';
import Color from '../../../../constant/Color';
import Font from '../../../../constant/Font';

export const styles = StyleSheet.create({
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    margin: 20,
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Color.PRIMARY, // Set the background color as needed
    zIndex: 2, // Adjust the z-index as needed
    elevation: 5, // For Android elevation
    borderRadius: 40,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedTab: {
    height: 40,
    width: 20,
    backgroundColor: '#fff', // Set the selected tab color as needed
    borderRadius: 40,
    margin: 5,
  },
  tabText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: Font.POPPINS_MEDIUM,
  },
  tabTextSelected: {
    fontSize: 16,
    color: Color.PRIMARY,
    fontFamily: Font.POPPINS_MEDIUM,
  },
});
