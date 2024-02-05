import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Color from '../../../constant/Color';
import Font from '../../../constant/Font';
import {Colors} from '../../../CSS/GlobalStyles';
import Display from '../../../utils/Display';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import CrossIcon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';

const CartItem = ({item}) => {
  const {generalSettings} = useSelector(state => state?.generalSettingsState);
  return (
    <View style={styles.itemList}>
      <View style={styles.itemDetails}>
        <View style={styles.section1}>
          <Text style={styles.itemName}>{item?.item}</Text>
          <Text style={styles.itemName}>
            {generalSettings?.currencyCode}
            {parseFloat(item?.total).toFixed(2)}
          </Text>
        </View>
        {/* <Text style={styles.subText}>
          Jalapeno Dip, Mild Spicy, Medium Spice level
        </Text> */}
        <View style={styles.section1}>
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
          <View style={styles.iconSection}>
            <TouchableOpacity style={styles.editIcon}>
              <FontAwsome name="edit" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteIcon}>
              <CrossIcon name="cross" size={20} color={Color.DEFAULT_RED} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemList: {
    backgroundColor: Colors.colorWhitesmoke_100,
    marginBottom: 4,
  },
  itemDetails: {
    padding: 10,
  },
  section1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 12,
    fontFamily: Font.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_BLACK,
  },
  subText: {
    fontSize: 10,
    fontFamily: Font.POPPINS_LIGHT,
    color: Color.DEFAULT_BLACK,
    paddingBottom: 10,
  },
  qtySection: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: Display.setWidth(12.5),
    borderColor: Color.PRIMARY,
    justifyContent: 'center',
    width: Display.setWidth(30),
    padding: Display.setWidth(0.75),
  },
  qtyButton1: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(7),
    height: Display.setHeight(3),
    borderTopLeftRadius: Display.setWidth(5),
    borderBottomLeftRadius: Display.setWidth(5),
  },
  qtyButton2: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(7),
    height: Display.setHeight(3),
    borderTopRightRadius: Display.setWidth(5),
    borderBottomRightRadius: Display.setWidth(5),
  },

  qtyValue: {
    fontSize: 16,
    marginHorizontal: 25,
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
  deleteIcon: {
    backgroundColor: '#FFCCCB',
    padding: 10,
    borderRadius: 50,
  },
});

export default CartItem;
