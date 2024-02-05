import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  SafeAreaView,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../../constant/Color';
import {CartAction} from '../../../services/redux/actions';
import {Colors, FontFamily, FontSize} from '../../../CSS/GlobalStyles';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomerDetails from '../../../components/Main/OrderDetails/CutomerDetails';
import Display from '../../../utils/Display';
import Font from '../../../constant/Font';
import CartItem from '../../../components/Main/Cart/CartItem';
import BillSummary from '../../../components/Main/OrderDetails/BillSummary';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const OrderDetails = ({navigation}) => {
  const {cartItems} = useSelector(state => state?.cartState);
  const dispatch = useDispatch();

  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showBillSummary, setShowBillSummary] = useState(false);
  const [showAddTip, setShowAddTip] = useState(false);

  const closeBillModal = () => {
    setShowBillSummary(false);
  };
  // Function to toggle visibility of CustomerDetails
  const toggleCustomerDetails = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowCustomerDetails(!showCustomerDetails);
  };

  // Function to toggle visibility of BillSummary
  const toggleBillSummary = () => {
    setShowBillSummary(!showBillSummary);
  };

  // Function to toggle visibility of AddTip
  const toggleAddTip = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowAddTip(!showAddTip);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.LIGHT_GREY2}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.menuText}>OrderDetails</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}>
          <View style={styles.summary}>
            <View style={styles.cardSection}>
              {cartItems?.length > 0 &&
                cartItems.map((item: any, index: number) => (
                  <CartItem item={item} key={index} />
                ))}
              <TouchableOpacity style={styles.addMoreContainer}>
                <Text style={styles.addMoreButton}>+Add More Items</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardSection}>
              <TouchableOpacity>
                <View style={styles.section1}>
                  <View style={styles.couponContainer}>
                    <MaterialIcon
                      name="ticket-percent-outline"
                      size={20}
                      style={styles.couponIcon}
                      color={Colors.colorBlack}
                    />
                    <Text style={styles.cardTitle}>All Coupons</Text>
                  </View>
                  <Entypo
                    name="chevron-small-right"
                    size={20}
                    color={Colors.colorDarkslateblue}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cardSection}>
              <TouchableOpacity onPress={toggleCustomerDetails}>
                <View style={styles.section1}>
                  <View style={styles.couponContainer}>
                    <Icon
                      name="person"
                      size={20}
                      style={styles.couponIcon}
                      color={Colors.colorBlack}
                    />
                    <Text style={styles.cardTitle}>Customer Details</Text>
                  </View>
                  <Entypo
                    name={
                      showCustomerDetails
                        ? 'chevron-small-down'
                        : 'chevron-small-right'
                    }
                    size={20}
                    color={Colors.colorDarkslateblue}
                  />
                </View>
              </TouchableOpacity>
              {showCustomerDetails && <CustomerDetails />}
            </View>

            <View style={styles.cardSection}>
              <TouchableOpacity onPress={toggleAddTip}>
                <View style={styles.section1}>
                  <View style={styles.couponContainer}>
                    <Entypo
                      name="wallet"
                      size={20}
                      style={styles.couponIcon}
                      color={Colors.colorBlack}
                    />
                    <Text style={styles.cardTitle}>Add Tip</Text>
                  </View>
                  <Entypo
                    name={
                      showAddTip ? 'chevron-small-down' : 'chevron-small-right'
                    }
                    size={20}
                    color={Colors.colorDarkslateblue}
                  />
                </View>
                {showAddTip && (
                  <View>
                    <Text>10%</Text>
                    <Text>10%</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.cardSection}>
              <TouchableOpacity onPress={toggleBillSummary}>
                <View style={styles.section1}>
                  <View style={styles.couponContainer}>
                    <Entypo
                      name="text-document"
                      size={20}
                      style={styles.couponIcon}
                      color={Colors.colorBlack}
                    />
                    <Text style={styles.cardTitle}>Bill Summary</Text>
                  </View>

                  <Entypo
                    name={
                      showBillSummary
                        ? 'chevron-small-down'
                        : 'chevron-small-right'
                    }
                    size={20}
                    color={Colors.colorDarkslateblue}
                  />
                </View>
                {showBillSummary && (
                  <BillSummary
                    isVisible={showBillSummary}
                    closeModal={closeBillModal}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.paymentContainer}>
            <Text style={styles.paymentText}>Cancel Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.generateKOTContainer}>
            <Text style={styles.generateKOTText}>Generate KOT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.LIGHT_GREY2,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Color.LIGHT_GREY2,
    marginBottom: 5,
  },
  menuText: {
    fontSize: 20,
    fontFamily: Font.POPPINS_BOLD,
    paddingLeft: 15,
  },
  summary: {
    flexDirection: 'column',
    padding: 12,
  },
  cardSection: {
    padding: 14,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Color.DEFAULT_WHITE,
    borderRadius: 12,
    shadowColor: '#000',
    marginBottom: 10,
  },
  couponIcon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: Font.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_BLACK,
  },
  addMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  addMoreButton: {
    color: Color.PRIMARY,
    fontWeight: 'bold',
    fontFamily: Font.POPPINS_BOLD,
  },
  removeButton: {
    color: Color.DEFAULT_RED,
    fontFamily: Font.POPPINS_BOLD,
  },
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
  },
  subText: {
    fontSize: 10,
    fontWeight: 'normal',
    fontFamily: Font.POPPINS_BOLD,
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

  footer: {
    flexDirection: 'row',
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    width: '100%',
    zIndex: 5,
    elevation: 5,
  },
  paymentContainer: {
    backgroundColor: Color.DEFAULT_WHITE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '50%',
  },
  paymentText: {
    color: '#d11a2a',
    fontWeight: 'bold',
  },
  generateKOTContainer: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '50%',
  },
  generateKOTText: {
    color: Color.DEFAULT_WHITE,
    fontWeight: 'bold',
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
