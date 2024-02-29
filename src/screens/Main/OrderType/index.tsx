import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Font from '../../../constant/Font';
import Color from '../../../constant/Color';
import { Icon } from 'react-native-elements';

const OrderType = ({navigation}: {navigation: NavigationProp<any>}) => {
  const handleCardPress = (cardNumber:any) => {
    console.log(`Clicked Card ${cardNumber}`);
     navigation?.navigate('MenuItems');
  
  };

  return (
    <SafeAreaView style={styles.container}>
   <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.menuText}>Order Types</Text>
        <View style={styles.filterIconContainer}>
          <TouchableOpacity>
            <Icon name="filter" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.card} onPress={() => handleCardPress(1)}>
        <Text style={styles.cardText}>TAKE AWAY</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => handleCardPress(2)}>
        <Text style={styles.cardText}>PICKUP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => handleCardPress(3)}>
        <Text style={styles.cardText}>DELIVERY</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => handleCardPress(4)}>
        <Text style={styles.cardText}>DINE-IN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Add for Android status bar
  },
   header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Color.LIGHT_GREY2,
  },
   menuText: {
    fontSize: 20,
    paddingLeft: 15,
    fontFamily: Font.POPPINS_BOLD, // Use appropriate Poppins font from your constants
  },
  filterIconContainer: {
    marginLeft: 'auto',
  },
  card: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    margin: 10,
    elevation:5
     
  },
  cardText: {
    fontSize: 30,
    fontWeight:'bold'
  },
});

export default OrderType;
