import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Color from '../../../constant/Color';
import {useSelector} from 'react-redux';

const ViewCart = ({navigation}: {navigation: any}) => {
  const {cartItems} = useSelector(state => state?.cartState);
  return (
    <View style={styles.bottomTabBar}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={styles.tabButton}>
        <Text style={styles.tabText}>View Cart</Text>
        <Text style={styles.cartItems}>{cartItems?.length}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewCart;

const styles = StyleSheet.create({
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: 'bold',
  },
  tabTextSelected: {
    fontSize: 16,
    color: Color.PRIMARY,
    fontWeight: 'bold',
  },
  cartItems: {
    fontSize: 16,
    color: Color.DEFAULT_BLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    borderRadius: 25,
    backgroundColor: Color.DEFAULT_WHITE,
  },
});
