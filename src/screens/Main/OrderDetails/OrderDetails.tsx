import React, {useEffect, useState} from 'react';
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
  StatusBar,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../../constant/Color';
import {CartAction, PaymentAction} from '../../../services/redux/actions';
import {Colors, FontFamily, FontSize} from '../../../CSS/GlobalStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomerDetails from '../../../components/Main/OrderDetails/CutomerDetails';
import Display from '../../../utils/Display';
import Font from '../../../constant/Font';
import CartItem from '../../../components/Main/Cart/CartItem';
import BillSummary from '../../../components/Main/OrderDetails/BillSummary';
import API_CALL from '../../../services/Api';
import {Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Separator from '../../../components/General/Seperator';
import CouponsAction from '../../../services/redux/actions/CouponsAction';
import OrderedItems from '../../../components/Main/Cart/OrderedItems';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const OrderDetails = ({navigation}) => {
  /**Redux States */
  const {cartItems, orderId} = useSelector(state => state?.cartState);
  const {token, userDetails, userIp} = useSelector(
    state => state?.generalState,
  );
  const {generalSettings} = useSelector(state => state?.generalSettingsState);
  const {couponDetails} = useSelector(state => state?.appliedCouponState);
  console.log('123', couponDetails);
  const currentDate = new Date();
  const dispatch = useDispatch();
  /**Toggles */
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showBillSummary, setShowBillSummary] = useState(false);
  const [showAddTip, setShowAddTip] = useState(false);
  const [showCustomTip, setShowCustomTip] = useState(false);
  /**Customer Details */

  /**BIll Sumary Details */
  const [finalSubTotal, setSubtotal] = useState(0);
  const [gstTax, setTax] = useState(0);
  const [finalAdditionalTax, setAdditionalTax] = useState(0);
  const [finalGrandTotal, setFinalGrandTotal] = useState(0);

  /**Customer Details */
  const [customerNameData, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');

  /**Tip amount */
  const [tipAmountValue, setTipamount] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const [value, setValue] = useState(0);
  const [applyCustomTip, setApplyCustomTip] = useState(false);

  const handleChangeText = text => {
    // Remove any non-numeric characters from the input
    const numericValue = text.replace(/[^0-9]/g, '');
    setValue(numericValue);
  };
  const applyTipHandler = () => {
    setApplyCustomTip(true);
    setTipamount(value);
  };

  const handleButtonPress = (buttonNumber: any) => {
    setActiveButton(buttonNumber);
    if (buttonNumber == 2) {
      setTipamount((tableOrderDetails?.grandTotal * 10) / 100);
    } else if (buttonNumber == 3) {
      setTipamount((tableOrderDetails?.grandTotal * 15) / 100);
    } else if (buttonNumber == 4) {
      if (applyCustomTip) {
        setTipamount(value);
      } else {
        setTipamount(0);
      }
    } else {
      setTipamount(0);
    }
  };

  const handleNameChange = name => {
    setCustomerName(name);
  };

  const handleEmailChange = email => {
    setEmail(email);
  };

  const handlePhoneChange = phone => {
    setPhone(phone);
  };

  /**ALL Order Details State */
  const [tableOrderDetails, setTableOrderDetails] = useState([]);

  const closeBillModal = () => {
    setShowBillSummary(false);
  };

  const cancelOrder = () => {
    dispatch(CartAction.removeItems());
  };

  const toggleAllCoupons = () => {
    dispatch(
      CouponsAction.updateCartTotals({
        subTotal: tableOrderDetails?.orderNumber
          ? tableOrderDetails.subTotal
          : finalSubTotal,
        tax: tableOrderDetails?.orderNumber ? tableOrderDetails.tax : gstTax,
        serviceCharge: tableOrderDetails?.orderNumber
          ? tableOrderDetails?.serviceChargeFee
          : finalAdditionalTax,
        total: tableOrderDetails?.orderNumber
          ? tableOrderDetails.grandTotal
          : finalGrandTotal,
        items: tableOrderDetails?.orderItems,
      }),
    );
    navigation.navigate('Coupons');
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

  // Function to toggle visibility of AddTip
  const toggleCustomTip = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowCustomTip(!showCustomTip);
    if (showCustomTip) {
      setActiveButton(4);
    }
  };

  /**Payment Handler */
  const paymentHandler = () => {
    const finalObject = {...tableOrderDetails, tipAmount: tipAmountValue};
    dispatch(PaymentAction.getOrderDetails(finalObject));
    navigation.navigate('Payments');
  };

  const calculateTaxes = () => {
    let taxValueToApi = 0;
    let taxAdditionalToApi = 0;
    //Tax Calculation
    taxValueToApi = (finalSubTotal * generalSettings?.taxPercentage) / 100;

    // Additional Tax Calculation
    taxAdditionalToApi = generalSettings?.isServiceChargePercentage
      ? (finalSubTotal * generalSettings?.serviceChargeFee) / 100
      : generalSettings?.serviceChargeFee;

    setTax(taxValueToApi);
    setAdditionalTax(taxAdditionalToApi);
  };

  const finalGrandTotalHandler = () => {
    let calculatedAmount = 0;

    if (
      generalSettings?.isServiceChargePercentage &&
      generalSettings?.isServiceChargeApplicable
    ) {
      calculatedAmount =
        finalSubTotal +
        (finalSubTotal * generalSettings?.taxPercentage) / 100 +
        (finalSubTotal * generalSettings?.serviceChargeFee) / 100;
    } else {
      calculatedAmount =
        finalSubTotal +
        (finalSubTotal * generalSettings?.taxPercentage) / 100 +
        generalSettings?.serviceChargeFee;
    }

    setFinalGrandTotal(parseFloat(calculatedAmount).toFixed(2));
  };

  /**Get Order Details */
  const getOrderDetails = () => {
    const orderDetails = {
      orderGuid: orderId,
    };
    API_CALL({
      method: 'POST',
      url: 'Order/GetOrderDetails',
      headerConfig: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: orderDetails,

      callback: async ({status, data}: {status: any; data: any}) => {
        if (status === 200) {
          setTableOrderDetails(data.data.order);
          // setCustomerName(data.data.order.customerName);
        } else {
          Alert.alert(
            'Error',
            data.errorMessage,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
      },
    });
  };

  /**On CLick GenerateKOT*/
  /**Order Item Info for API */
  const orderItemsInfo = cartItems?.map(list => ({
    createdBy: userDetails.fullName,
    createdDate: currentDate,
    createdIP: userIp,
    updatedBy: '',
    updatedDate: null,
    updatedIP: '',
    deletedBy: '',
    deletedDate: null,
    deletedIP: '',
    id: 0,
    guid: userDetails?.guid,
    orderId: 0,
    menuId: list?.responseOrder?.id,
    menuGroupId: list.responseOrder.menuGroupId,
    itemName: list?.item,
    menuSubItemId: list?.subItem != null ? list?.subItem.id : null,
    subItemName: list?.subItem != null ? list?.subItem.itemName : null,
    price: list?.price,
    specialInstructions:
      list?.customFieldListItem != undefined
        ? JSON.stringify(
            list?.customFields.reduce((acc, item) => {
              acc[item.fieldName] = item.value;
              return acc;
            }, {}),
          )
        : '',
    // customFields: list?.customFieldListItem,
    quantity: list?.qty,
    addOnTemplateText: '',
    addOnAmount: list?.addonsamount1,
    menuAddOnDescription: '',
    originalQuantity: 0,
    rating: 0,
    discountAmount: list?.total * (list?.responseOrder.discount / 100),
    couponAmount: 0,
    discountPercentage: list?.responseOrder.discount,
    couponPercentage: 0,
    singleItemDiscountAmount: 0,
    singleItemCouponAmount: 0,
    isPartialRefunded: false,
    isNewOrder: false,
    isUpdateQuantity: false,

    groupInfo: {
      groupId: 0,
      groupIndex: 0,
      groupName: '',
    },
    printer: {
      server: '',
      name: '',
    },

    // selectedOrderItemAddOns: selectedAddons(list?.addonField, list.data),
    selectedOrderItemAddOns: [],
    refundQuantity: 0,

    menuSubItem:
      list?.subItem?.id != null
        ? {
            createdBy: userDetails.fullName,
            createdDate: currentDate,
            createdIP: userIp,
            id: list.data?.subItem?.id,
            itemName: list?.subItem?.itemName,
            itemPrice: list?.subItem?.itemPrice,
          }
        : null,
  }));

  const SaveOrder = () => {
    console.log(customerNameData);
    const createdBy = userDetails?.userId;
    const createdDate = currentDate;
    const createdIP = userIp;
    const updatedBy = '';
    const updatedDate = null;
    const updatedIP = '';

    const id = 0;
    const guid = userDetails?.guid;

    /**Customer Details */
    const customerId = 0;
    const customerName = customerNameData;
    const emailAddress = email;
    const phone = phoneNumber;

    /**Amounts */
    const subTotal = finalSubTotal;
    const tax = gstTax;
    const grandTotal = finalGrandTotal;
    const discountAmount = 0;
    const couponAmount = '';
    const tipAmount = tipAmountValue;
    const paymentDiscountAmount = 0;
    const addOnAmount = 0;
    const serviceCharge = generalSettings?.serviceChargeFee;
    const serviceChargeFee = finalAdditionalTax;
    const refundAmount = 0;
    const refundedTax = 0;
    const refundedServiceCharge = 0;
    const paymentDiscountPercentage = 0;
    const isServiceChargeRefund = false;
    const isTaxRefund = false;
    const isServiceChargePercentage =
      generalSettings?.isServiceChargePercentage;
    const taxPercentage = generalSettings?.taxPercentage;
    const couponCode = '';

    /**Order keys */
    const orderId = 0;
    const orderNumber = '';
    const orderStatusId = 21;
    const orderSource = 'POS';
    const deliveryType = 'TakeAway';

    /**OrderItems Keys */
    const orderItems = orderItemsInfo;
    const orderItemAddOns = [
      {
        createdBy: userDetails.fullName,
        createdDate: currentDate,
        createdIP: userIp,
        updatedBy: '',
        updatedDate: null,
        updatedIP: '',
        deletedBy: '',
        deletedDate: null,
        deletedIP: '',
        id: 0,
        guid: guid,
        orderId: 0,
        orderItemId: 0,
        addOnId: 1,
        menuId: 1,
      },
    ];

    /**Table Dine-In Keys */
    const tableId = '';
    const freeUpTableIds = '';
    const numberOfPeople = 0;

    /**Payment Type */
    const modeOfPayment = 'Cash';
    const creditCardType = '';
    const paymentStatusId = 2;
    const isPrintingFailed = false;
    const printerStatusId = 0;

    /**Split Payment */
    const orderSplit = {};
    const noOfSplits = 0;
    const splitPayments = orderSplit;

    /**Additional Fields */
    const orderSpecialInstructions = '';
    const vehicleNumber = '';
    const addOnTemplateText = '';
    const adminOrderComment = '';
    const kitchenServiceResponse = '';

    /**Delivery Keys */
    const isDeliveryScheduled = false;
    const scheduleDeliveryTime = currentDate;
    const estimatedDeliveryOrPickupTime = currentDate;
    const orderCloseDateTime = currentDate;
    const orderReadyDateTime = currentDate;
    const isPickupOrder = true;

    const orderPayload = {
      createdBy,
      createdDate,
      createdIP,
      updatedBy,
      updatedDate,
      updatedIP,
      id,
      guid,
      orderSource,
      customerId,
      customerName,
      emailAddress,
      phone,
      printerStatusId,
      discountAmount,
      couponAmount,
      tipAmount,
      subTotal,
      tax,
      grandTotal,
      orderStatusId,
      vehicleNumber,
      adminOrderComment,
      kitchenServiceResponse,
      orderSpecialInstructions,
      modeOfPayment,
      paymentDiscountAmount,
      addOnAmount,
      addOnTemplateText,
      creditCardType,
      serviceCharge,
      serviceChargeFee,
      deliveryType,
      tableId,
      freeUpTableIds,
      numberOfPeople,
      refundAmount,
      refundedTax,
      refundedServiceCharge,
      paymentDiscountPercentage,
      paymentStatusId,
      isPrintingFailed,
      orderId,
      orderNumber,
      isPickupOrder,
      isServiceChargeRefund,
      isTaxRefund,
      isServiceChargePercentage,
      isDeliveryScheduled,
      scheduleDeliveryTime,
      estimatedDeliveryOrPickupTime,
      orderCloseDateTime,
      orderReadyDateTime,
      taxPercentage,
      couponCode,
      orderItems,
      orderItemAddOns,
      noOfSplits,
      splitPayments,
    };

    //console.log(orderPayload, 'SVAE_ORDER');
    API_CALL({
      method: 'POST',
      url: 'Order/SaveOrder',
      headerConfig: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: orderPayload,

      callback: async ({status, data}: {status: any; data: any}) => {
        if (status === 200) {
          Alert.alert(
            'Success',
            'Order Placed Successfully',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Dashboard');
                  dispatch(CartAction.removeItems());
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert(
            'Error',
            data.errorMessage,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
      },
    });
  };

  // Calculate finalSubTotal whenever cartItems change
  useEffect(() => {
    let total = 0;
    cartItems?.forEach((item: any) => {
      total += item.price; // Assuming each item in cartItems has a 'price' property
    });
    setSubtotal(total);
  }, [cartItems]);

  useEffect(() => {
    calculateTaxes();
    finalGrandTotalHandler();
  }, [finalSubTotal]);

  useEffect(() => {
    if (orderId) {
      getOrderDetails();
    }
  }, [orderId]);

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />
      <Separator extraProps={{}} height={StatusBar.currentHeight} />
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.menuText}>OrderDetails</Text>
        </View>
      </SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}>
        <View style={styles.summary}>
          {tableOrderDetails?.orderNumber && (
            <View style={styles.cardSection}>
              <Text style={styles.orderNumber}>
                {tableOrderDetails?.orderNumber}
              </Text>
              <Text>{tableOrderDetails?.customerName}</Text>
            </View>
          )}
          <View style={styles.cardSection}>
            <View style={styles.addMoreContainer}>
              <Text style={styles.addMoreButton}>ITEM DETAILS</Text>
            </View>
            {tableOrderDetails?.orderNumber ? (
              <>
                {tableOrderDetails?.orderItems?.length > 0 &&
                  tableOrderDetails?.orderItems.map(
                    (item: any, index: number) => (
                      <OrderedItems item={item} key={index} />
                    ),
                  )}
              </>
            ) : (
              <>
                {cartItems?.length > 0 &&
                  cartItems.map((item: any, index: number) => (
                    <CartItem item={item} key={index} />
                  ))}
              </>
            )}

            {/* <TouchableOpacity
              style={styles.addMoreContainer}
              onPress={() => navigation.goBack()}>
              <Text style={styles.addMoreButton}>+Add More Items</Text>
            </TouchableOpacity> */}
          </View>
          {tableOrderDetails?.orderNumber && (
            <View style={styles.cardSection}>
              <TouchableOpacity onPress={toggleAllCoupons}>
                <View style={styles.section1}>
                  <View style={styles.couponContainer}>
                    <MaterialIcon
                      name="ticket-percent-outline"
                      size={20}
                      style={styles.couponIcon}
                      color={Colors.colorLimegreen}
                    />
                    {couponDetails?.coupon ? (
                      <Text style={styles.cardTitle}>
                        {couponDetails?.coupon}
                      </Text>
                    ) : (
                      <Text style={styles.cardTitle}>All Coupons</Text>
                    )}
                  </View>
                  <Entypo
                    name="chevron-small-right"
                    size={20}
                    color={Colors.colorDarkslateblue}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.cardSection}>
            <TouchableOpacity onPress={toggleCustomerDetails}>
              <View style={styles.section1}>
                <View style={styles.couponContainer}>
                  <Icon
                    name="person"
                    size={20}
                    style={styles.couponIcon}
                    color={Color.FABEBOOK_BLUE}
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
            {showCustomerDetails && (
              <CustomerDetails
                onNameChange={handleNameChange}
                onEmailChange={handleEmailChange}
                tableOrderDetails={tableOrderDetails}
                onPhoneChange={handlePhoneChange}
              />
            )}
          </View>
          {tableOrderDetails?.orderNumber && (
            <View style={styles.cardSection}>
              <TouchableOpacity
                onPress={toggleAddTip}
                disabled={tableOrderDetails?.orderNumber ? false : true}>
                <View style={styles.section1}>
                  <View style={styles.couponContainer}>
                    <Entypo
                      name="wallet"
                      size={20}
                      style={styles.couponIcon}
                      color={Colors.colorDarkslateblue}
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
                  <View style={styles.containerTip}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        {
                          backgroundColor:
                            activeButton === 1 ? 'orange' : Color.PRIMARY,
                          flex: 0.2,
                        },
                      ]}
                      onPress={() => handleButtonPress(1)}>
                      <Text style={styles.buttonText}>No Tip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        {
                          backgroundColor:
                            activeButton === 2 ? 'orange' : Color.PRIMARY,
                          flex: 0.2,
                        },
                      ]}
                      onPress={() => handleButtonPress(2)}>
                      <Text style={styles.buttonText}>10 %</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        {
                          backgroundColor:
                            activeButton === 3 ? 'orange' : Color.PRIMARY,
                          flex: 0.2,
                        },
                      ]}
                      onPress={() => handleButtonPress(3)}>
                      <Text style={styles.buttonText}>15 %</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        {
                          backgroundColor:
                            activeButton === 4 ? 'orange' : Color.PRIMARY,
                          flex: 0.2,
                        },
                      ]}
                      onPress={toggleCustomTip}>
                      <Text style={styles.buttonText}>Custom</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {showCustomTip && showAddTip && (
                  <View style={styles.inputRow}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter custom tip"
                      onChangeText={handleChangeText}
                      value={value}
                      keyboardType="numeric"
                    />
                    <TouchableOpacity
                      style={styles.applyButton}
                      onPress={applyTipHandler}>
                      <Text style={styles.applyText}>Apply</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}

          {orderId ? (
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
                    cartItems={cartItems}
                    totals={{
                      subTotal: tableOrderDetails?.subTotal,
                      tax: tableOrderDetails?.tax,
                      serviceCharge: tableOrderDetails?.serviceChargeFee,
                      total: tableOrderDetails?.grandTotal,
                      tipAmount: tipAmountValue,
                      couponDiscount: couponDetails,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          ) : (
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
                    cartItems={cartItems}
                    totals={{
                      subTotal: finalSubTotal,
                      tax: gstTax,
                      serviceCharge: finalAdditionalTax,
                      total: finalGrandTotal,
                      tipAmount: tipAmountValue,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          )}

          {orderId && (
            <TouchableOpacity onPress={() => paymentHandler()}>
              <View style={styles.cardSection2}>
                <View style={styles.section1}>
                  <Text style={styles.cardTitle2}>Pay</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => cancelOrder()}
          style={styles.paymentContainer}>
          <Text style={styles.paymentText}>Cancel Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SaveOrder()}
          style={styles.generateKOTContainer}>
          <Text style={styles.generateKOTText}>
            {tableOrderDetails?.orderNumber ? 'Fire KOT' : 'Generate KOT'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.LIGHT_GREY2,
  },

  containerTip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  applyButton: {
    backgroundColor: Color.PRIMARY,
    padding: 10,
    borderRadius: 5,
  },
  applyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
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
  orderNumber: {
    fontFamily: Font.POPPINS_SEMI_BOLD,
  },
  cardSection: {
    padding: 14,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Color.DEFAULT_WHITE,
    borderRadius: 12,
    shadowColor: '#000',
    marginBottom: 15,
  },

  cardSection2: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Color.PRIMARY,
    borderRadius: 12,
    shadowColor: '#000',
    marginBottom: 10,
    marginTop: 20,
  },
  couponIcon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: Font.POPPINS_REGULAR,
    color: Color.DEFAULT_BLACK,
  },
  cardTitle2: {
    fontSize: 14,
    fontFamily: Font.POPPINS_REGULAR,
    color: Color.DEFAULT_WHITE,
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
    flexWrap: 'wrap',
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
