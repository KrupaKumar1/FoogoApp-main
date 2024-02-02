import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import CrossIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomerDetails from '../../../components/Main/OrderDetails/CutomerDetails';
import Display from '../../../utils/Display';
import Font from '../../../constant/Font';

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
  const [showBillSummary, setShowBillSummary] = useState(true);
  const [showAddTip, setShowAddTip] = useState(false);

  // Function to toggle visibility of CustomerDetails
  const toggleCustomerDetails = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowCustomerDetails(!showCustomerDetails);
  };

  // Function to toggle visibility of BillSummary
  const toggleBillSummary = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
        <ScrollView style={styles.scrollView} decelerationRate="fast">
          <View style={styles.summary}>
            <View style={styles.cardSection}>
              {cartItems?.length > 0 &&
                cartItems.map((item: any, index: number) => (
                  <View style={styles.itemList} key={index}>
                    <View style={styles.itemDetails}>
                      <View style={styles.section1}>
                        <Text>{item?.name}</Text>
                        <Text>$600.00</Text>
                      </View>
                      <Text style={styles.subText}>
                        Jalapeno Dip, Mild Spicy, Medium Spice level
                      </Text>
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
                            <CrossIcon
                              name="cross"
                              size={20}
                              color={Color.DEFAULT_RED}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
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
                      color={Colors.colorDarkslateblue}
                    />
                    <Text>All Coupons</Text>
                  </View>
                  <CrossIcon
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
                  <Text>Customer Details</Text>
                  <CrossIcon
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
                  <Text>Add Tip</Text>
                  <CrossIcon
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
                  <Text>Bill Summary</Text>
                  <CrossIcon
                    name={
                      showBillSummary
                        ? 'chevron-small-down'
                        : 'chevron-small-right'
                    }
                    size={20}
                    color={Colors.colorDarkslateblue}
                  />
                </View>
              </TouchableOpacity>
              {showBillSummary && (
                <View style={styles.billContainer}>
                  <View style={styles.billItem}>
                    <Text>Sub Total</Text>
                    <Text>$10.00</Text>
                  </View>
                  <View style={styles.billItem}>
                    <Text>Coupon Value</Text>
                    <Text style={styles.reducedAmountText}>-$5.00</Text>
                  </View>
                  <View style={styles.billItem}>
                    <Text>Tax (10%)</Text>
                    <Text>$4.00</Text>
                  </View>
                  <View style={styles.billItem}>
                    <Text>Service Tax (3%)</Text>
                    <Text>$1.00</Text>
                  </View>
                  <View style={styles.billItem}>
                    <Text style={styles.totalDue}>Total Due Amount</Text>
                    <Text style={styles.totalDue}>$40.00</Text>
                  </View>
                </View>
              )}
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
  addMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  addMoreButton: {
    color: Color.PRIMARY,
    fontWeight: 'bold',
  },
  removeButton: {
    color: Color.DEFAULT_RED,
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
    borderRadius: Display.setWidth(12.5), // Set border radius dynamically
    borderColor: Color.PRIMARY,
    justifyContent: 'center',
    width: Display.setWidth(30), // Set width dynamically
    padding: Display.setWidth(0.75), // Set padding dynamically
  },
  qtyButton1: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(7), // Set width dynamically
    height: Display.setHeight(3), // Set height dynamically
    borderTopLeftRadius: Display.setWidth(5), // Set border radius dynamically
    borderBottomLeftRadius: Display.setWidth(5), // Set border radius dynamically
  },
  qtyButton2: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(7), // Set width dynamically
    height: Display.setHeight(3), // Set height dynamically
    borderTopRightRadius: Display.setWidth(5), // Set border radius dynamically
    borderBottomRightRadius: Display.setWidth(5), // Set border radius dynamically
  },

  qtyValue: {
    fontSize: 16,
    marginHorizontal: 25,
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
  billSummary: {
    backgroundColor: Color.DEFAULT_WHITE,
    padding: 20,
  },
  billContainer: {
    marginTop: 20,
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  totalDue: {
    fontWeight: 'bold',
    fontSize: FontSize.size_xl,
    color: Color.DEFAULT_BLACK,
  },
  reducedAmountText: {
    color: '#d11a2a',
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    width: '100%',
    zIndex: 2, // Adjust the z-index as needed
    elevation: 5, // For Android elevation
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
