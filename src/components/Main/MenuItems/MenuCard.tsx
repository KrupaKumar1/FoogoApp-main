import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';

import Font from '../../../constant/Font';
import Color from '../../../constant/Color';
import Display from '../../../utils/Display';
import AddItemModal from './AddItemModal';
import {CartAction} from '../../../services/redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {FontSize} from '../../../CSS/GlobalStyles';

const MenuCard = ({itemDetails,cardQtySetHandler}: {itemDetails: any}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {cartItems} = useSelector(state => state?.cartState);
  console.log(itemDetails?.quantity)

  const dispatch = useDispatch();

  // const openModal = () => {
  //   if (itemDetails?.menuSubItem?.length > 0) {
  //     setModalVisible(true);
  //   } else {
  //     dispatch(CartAction.addItemToCart({...itemDetails, qty: 1}));
  //     // setModalVisible(true);
  //   }
  // };

  const openModal = () => {
    const itemObjectDetails = {
      responseOrder: itemDetails,
      qty: itemDetails?.quantity || 1,
      item: itemDetails?.name,
      price: itemDetails?.deliveryPrice,
      total: itemDetails?.deliveryPrice,
      addonsamount1: 0,
      subItem: {},
      customFieldListItem: [],
      addons: [],
      listAddons: [],
      radioAddon: {},
      customFields: [],
      addonField: [],
    };

    if (itemDetails?.menuSubItem?.length > 0) {
      setModalVisible(true);
    } else {
      // dispatch(CartAction.addItemToCart(itemObjectDetails));
      // setModalVisible(true);
    

    const objIndex = cartItems?.findIndex(
      (obj:any) => obj.item === itemObjectDetails.item,
    );

    if (objIndex !== -1) {
      dispatch(CartAction.sameitemupdateIn(itemObjectDetails));
    } else {
       dispatch(CartAction.orderdetailsIn(itemObjectDetails));
     // dispatch(CartAction.addItemToCart(itemObjectDetails));
    }
  };
}
const showOrderDetailsMinusHandler = () => {
    const itemObjectDetails = {
      responseOrder: itemDetails,
      qty: itemDetails?.quantity || 1,
      item: itemDetails?.name,
      price: itemDetails?.deliveryPrice,
      total: itemDetails?.deliveryPrice,
      addonsamount1: 0,
      subItem: {},
      customFieldListItem: [],
      addons: [],
      listAddons: [],
      radioAddon: {},
      customFields: [],
      addonField: [],
    };

     if (itemDetails?.menuSubItem?.length > 0) {
      setModalVisible(true);
    } else {

 
    const objIndex = cartItems?.findIndex((obj) => {
      const sameItem = obj.item === itemObjectDetails.item;
      return sameItem;
    });
    const matchedItemList = cartItems[objIndex];
 
    if (objIndex !== -1) {
      const quantityUpdateObject = {
        id: matchedItemList.id,
        qty: matchedItemList.qty,
      };
      // dispatch(reduceQuantity(quantityUpdateObject));
    
    } else {
      dispatch(CartAction.orderdetailsIn(itemObjectDetails));
      
    }
  }
  };
 

 const addOrderItem = (item:any) => {
   
    const isMatching = cartItems.map((cartItem:any) => cartItem.item === item.name);
    // If you want to check if at least one item has a matching name
    const anyMatching = isMatching.some((match:any) => match === true);
    if (anyMatching) {
      dispatch(customizationIn(item));
    } else {
      dispatch(additemIn(item));
    }
  };



   /**adding quantity or reducing quantity */
  const addonPlusHandler = (menuitem1:any) => {
    const menuItemDetails = { ...menuitem1, quantity: 1 };
 
    if (menuItemDetails?.menuSubItem?.length == 0) {
       openModal();
       cardQtySetHandler();
    } else {
      // addOrderItem(menuItemDetails);
      // cardQtySetHandler();
    }
  };
 
  /**checking the customization and dispatcing the action */
  const addonMinusHandler = (menuitemData:any) => {
    const menuItemDetails = { ...menuitemData, quantity: 1 };
 
    if (menuItemDetails?.menuSubItem?.length == 0) {
      showOrderDetailsMinusHandler();
      cardQtySetHandler();
 
      // menuGroupitemsHandler();
    } else {
      // addOrderItem(menuItemDetails);
      // cardQtySetHandler();
      // cardQtySetHandler();
    }
  };
 

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            itemDetails && itemDetails.pictureName !== 'noimage.png'
              ? itemDetails.pictureName.replace(/\\/g, '/')
              : 'https:devcdn.restrozap.com/7/images/restaurant/menu/pexels-ash-376464.jpg',
        }}
        style={styles.posterStyle}
        resizeMode="cover"
      />

      <View style={styles.overlayContainer}>
        <View style={styles.bestsellerTag}>
          <Text style={styles.bestsellerText}>Bestseller</Text>
        </View>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemName}>{itemDetails?.name}</Text>
          <View style={styles.priceRatingContainer}>
            <Text style={styles.price}>$50.00</Text>
          </View>
          <View style={styles.buttonConatiner}>
            <TouchableOpacity style={styles.moreDetailsButton}>
              <Text
                style={styles.moreDetailsButtonText}>{`More Details>`}</Text>
            </TouchableOpacity>
            {!itemDetails.quantity ? (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => openModal()}>
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.qtySection}>
                <TouchableOpacity style={styles.qtyButton1}>
                  <Text style={styles.qtyIcon}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.qtyValue}
                  value={itemDetails.quantity.toString()?itemDetails.quantity.toString():"1"}
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.qtyButton2} onPress={()=>addonPlusHandler(itemDetails)}>
                  <Text style={styles.qtyIcon}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <AddItemModal
            isVisible={isModalVisible}
            closeModal={closeModal}
            itemDetails={itemDetails}
          />
        </View>
      </View>
    </View>
  );
};

const borderRadiusValue = 20; // Adjust this value as needed

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3, // Shadow blur radius
    borderRadius: borderRadiusValue,
    backgroundColor: Color.LIGHT_GREY,
    marginTop: 8,
    height: Display.setWidth(30), // Adjust the height as needed
    overflow: 'hidden', // Ensure content inside the container doesn't overflow
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

  posterStyle: {
    width: '30%',
    height: '100%',
    borderTopLeftRadius: borderRadiusValue,
    borderBottomLeftRadius: borderRadiusValue,

    borderWidth: 2,
  },
  overlayContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bestsellerTag: {
    position: 'absolute',
    bottom: 115,
    left: 180,
    width: 160,
    backgroundColor: Color.PRIMARY, // Set your primary color
    borderRadius: borderRadiusValue, // Match the borderRadius value
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  bestsellerText: {
    color: Color.DEFAULT_WHITE, // Set text color
    fontFamily: Font.POPPINS_SEMI_BOLD,
    fontSize: 12,
  },
  itemDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  itemName: {
    fontFamily: Font.POPPINS_MEDIUM,
    fontSize: FontSize.size_sm,
    color: Color.DEFAULT_BLACK,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  price: {
    fontFamily: Font.POPPINS_MEDIUM,
    fontSize: FontSize.size_sm,
    color: Color.DEFAULT_BLACK,
    marginRight: 10,
  },

  buttonConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  moreDetailsButton: {
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 5,
  },
  moreDetailsButtonText: {
    fontFamily: Font.POPPINS_EXTRA_LIGHT,
    fontSize: 12,
    color: Color.DEFAULT_BLACK,
  },
  addButton: {
    backgroundColor: Color.LIGHT_GREY2,
    width: 70,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 5,
  },
  addButtonText: {
    fontFamily: Font.POPPINS_REGULAR,
    fontSize: 12,
    color: Color.DARK_ONE,
  },
  qtySection: {
    flexDirection: 'row',

    justifyContent: 'center',
    // align: 'center',

    width: 100,
    padding: 3,
    // height: 100,
  },
  qtyButton1: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  qtyButton2: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  qtyValue: {
    fontSize: 16,

    marginHorizontal: 15,
  },
  qtyIcon: {
    color: Color.DEFAULT_WHITE,
  },
});

export default MenuCard;
