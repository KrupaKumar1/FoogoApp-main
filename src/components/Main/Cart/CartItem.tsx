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
import {useSelector,useDispatch} from 'react-redux';
import { CartAction } from '../../../services/redux/actions';

const CartItem = ({item}) => {
  const {generalSettings} = useSelector(state => state?.generalSettingsState);
   const {cartItems} = useSelector(state => state?.cartState);
  const dispatch = useDispatch();

  const openModal = (itemDetails:any) => {
    const itemObjectDetails = {
      responseOrder: itemDetails,
      qty: itemDetails?.qty || 1,
      item: itemDetails?.item,
      price: itemDetails?.price,
      total: itemDetails?.price,
      addonsamount1: 0,
      subItem: {},
      customFieldListItem: [],
      addons: [],
      listAddons: [],
      radioAddon: {},
      customFields: [],
      addonField: [],
    };

  
    

    const objIndex = cartItems?.findIndex(
      (obj:any) => obj.item === itemObjectDetails.item,
    );

    if (objIndex !== -1) {
      dispatch(CartAction.sameitemupdateIn(itemObjectDetails));
    } else {
       dispatch(CartAction.orderdetailsIn(itemObjectDetails));
     // dispatch(CartAction.addItemToCart(itemObjectDetails));
    }
  
}
const showOrderDetailsMinusHandler = (itemDetails:any) => {
    const itemObjectDetails = {
      responseOrder: itemDetails,
      qty: itemDetails?.qty || 1,
      item: itemDetails?.item,
      price: itemDetails?.price,
      total: itemDetails?.price,
      addonsamount1: 0,
      subItem: {},
      customFieldListItem: [],
      addons: [],
      listAddons: [],
      radioAddon: {},
      customFields: [],
      addonField: [],
    };

   

 
    const objIndex = cartItems?.findIndex((obj:any) => {
      const sameItem = obj.item === itemObjectDetails.item;
      return sameItem;
    });
    const matchedItemList = cartItems[objIndex];
 
    if (objIndex !== -1) {
      const quantityUpdateObject = {
        id: matchedItemList.id,
        qty: matchedItemList.qty,
      };
       dispatch(CartAction.reduceQuantity(quantityUpdateObject));
    
    } else {
      dispatch(CartAction.orderdetailsIn(itemObjectDetails));
      
    }
  
  };

    /**adding quantity or reducing quantity */
  const addonPlusHandler = (menuitem1:any) => {
    const menuItemDetails = { ...menuitem1, quantity: 1 };
 
    if (menuItemDetails?.menuSubItem?.length == 0) {
       openModal(menuitem1);
    //   cardQtySetHandler();
    } else {
      // addOrderItem(menuItemDetails);
      // cardQtySetHandler();
    }
  };
 
  /**checking the customization and dispatcing the action */
  const addonMinusHandler = (menuitemData:any) => {
    const menuItemDetails = { ...menuitemData, quantity: 1 };
 
    if (menuItemDetails?.menuSubItem?.length == 0) {
      showOrderDetailsMinusHandler(menuitemData);
    //  cardQtySetHandler();
 
      // menuGroupitemsHandler();
    } else {
      // addOrderItem(menuItemDetails);
      // cardQtySetHandler();
      // cardQtySetHandler();
    }
  };
  console.log(item)
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
            <TouchableOpacity style={styles.qtyButton1} onPress={()=>addonMinusHandler(item)}>
              <Text style={styles.qtyIcon}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{item?.qty}</Text>
            <TouchableOpacity style={styles.qtyButton2} onPress={()=>addonPlusHandler(item)}>
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
    borderRadius: 25,
    borderColor: Color.PRIMARY,
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
  deleteIcon: {
    backgroundColor: '#FFCCCB',
    padding: 10,
    borderRadius: 50,
  },
});

export default CartItem;
