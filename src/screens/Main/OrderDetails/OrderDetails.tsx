import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native';
import Header from '../../../components/General/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../../constant/Color';
import {CartAction} from '../../../services/redux/actions';
import Font from '../../../constant/Font';
import {FontFamily, FontSize} from '../../../CSS/GlobalStyles';
import Display from '../../../utils/Display';

const OrderDetails = ({navigation}) => {
  const {cartItems} = useSelector(state => state?.cartState);
  const dispatch = useDispatch();
  console.log('CART ITEMS', cartItems);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.menuText}>OrderDetails</Text>
      </View>
      <View style={styles.summary}>
        <View style={styles.itemSummary}>
          <View style={styles.section1}>
            <Text>ITEM SUMMARY</Text>
            <Text
              onPress={() => dispatch(CartAction.removeItems())}
              style={styles.removeButton}>
              Remove
            </Text>
          </View>
        </View>
        <FlatList
          data={cartItems}
          renderItem={({item}) => (
            <View style={styles.itemList}>
              <View style={styles.itemDetails}>
                <View style={styles.section1}>
                  <Text>{item?.name}</Text>
                  <Text>$600.00</Text>
                </View>
                <Text style={styles.subText}>
                  Jalapeno Dip, Mild Spicy, Medium Spice level
                </Text>
                <View style={styles.qtySection}>
                  <TouchableOpacity style={styles.qtyButton1}>
                    <Text style={styles.qtyIcon}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.qtyValue}
                    value="1"
                    keyboardType="numeric"
                  />
                  <TouchableOpacity style={styles.qtyButton2}>
                    <Text style={styles.qtyIcon}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Color.LIGHT_GREY2,
    marginBottom: 20,
  },
  menuText: {
    fontSize: 20,
    paddingLeft: 15,
  },
  summary: {
    flexDirection: 'column',
    height: Display.setHeight(50),
  },
  itemSummary: {
    padding: 20,
    backgroundColor: Color.DEFAULT_WHITE,
  },
  removeButton: {
    color: Color.DEFAULT_RED,
  },
  itemList: {
    backgroundColor: Color.LIGHT_GREY2,
  },
  itemDetails: {
    padding: 20,
  },
  section1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  subText: {
    fontSize: 10,
    fontWeight: 'normal',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.DEFAULT_BLACK,
    paddingBottom: 10,
  },
  qtySection: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 25,
    borderColor: Color.PRIMARY,
    justifyContent: 'center',
    // align: 'center',

    width: 150,
    padding: 3,
    // height: 100,
  },
  qtyButton1: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  qtyButton2: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  qtyValue: {
    fontSize: 16,

    marginHorizontal: 25,
  },
  qtyIcon: {
    color: Color.DEFAULT_WHITE,
  },
});
