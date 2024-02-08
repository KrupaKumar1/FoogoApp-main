import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Color from '../../../constant/Color';
import Font from '../../../constant/Font';
import Display from '../../../utils/Display';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {Colors} from '../../../CSS/GlobalStyles';

const OrderedItems = ({item}) => {
  const {generalSettings} = useSelector(state => state?.generalSettingsState);
  return (
    <View style={styles.itemList}>
      <View style={styles.itemDetails}>
        <View style={styles.section1}>
          <View style={styles.itemInfo}>
            <View style={styles.itemNameContainer}>
              <Text style={styles.itemName}>{item?.itemName}</Text>
            </View>
            <Text style={styles.itemPrice}>
              {generalSettings?.currencyCode}
              {parseFloat(
                item?.price * item?.quantity + item?.addOnAmount,
              ).toFixed(2)}
            </Text>
          </View>
          <View style={styles.qtySection}>
            <TouchableOpacity style={styles.qtyButton1}>
              <Text style={styles.qtyIcon}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{item?.quantity}</Text>
            <TouchableOpacity style={styles.qtyButton2}>
              <Text style={styles.qtyIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemList: {},
  itemDetails: {
    padding: 5,
  },
  section1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.DEFAULT_GREEN,
    alignItems: 'center',
    marginBottom: 5,
  },
  itemInfo: {
    flex: 1, // Added flex to allow itemName and itemPrice to take available space
  },
  itemNameContainer: {
    backgroundColor: Color?.LIGHT_YELLOW,
  },
  itemName: {
    fontSize: 14,
    fontFamily: Font.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_BLACK,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: Font.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_BLACK,
    textAlign: 'right', // Align the price to the right
  },
  qtySection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(30),
    height: Display.setHeight(5),
    padding: Display.setWidth(0.75),
  },
  qtyButton1: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(7),
    height: Display.setHeight(3),
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  qtyButton2: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(7),
    height: Display.setHeight(3),
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  qtyValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 20,
    fontFamily: Font.POPPINS_BOLD,
  },
  qtyIcon: {
    color: Color.DEFAULT_WHITE,
  },
  iconSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editIcon: {
    backgroundColor: Color.DEFAULT_GREY,
    padding: 10,
    borderRadius: 50,
    marginRight: 12,
  },
});

export default OrderedItems;
