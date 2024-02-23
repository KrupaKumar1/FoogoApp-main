import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Separator from '../../../components/General/Seperator';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {CartAction, PaymentAction} from '../../../services/redux/actions';
import API_CALL from '../../../services/Api';
import RazorpayCheckout from 'react-native-razorpay';

// Initialize Razorpay with your API key


const Payments = ({navigation}) => {
  
  const [selectedOption, setSelectedOption] = useState('Cash');
   const {cartItems, orderId} = useSelector(state => state?.cartState);
  const {token, userDetails, userIp} = useSelector(
    state => state?.generalState,
  );
  const {generalSettings} = useSelector(state => state?.generalSettingsState);

  const currentDate = new Date();
  const dispatch = useDispatch();
  const {orderDetails, paymentMethod} = useSelector(
    state => state?.paymentState,
  );

  console.log('DERAILS', orderDetails);

  const handleOptionSelect = option => {
    setSelectedOption(option);
    dispatch(PaymentAction.paymentMethod(option));
  };
  // RazorpayCheckout.setApiKey("rzp_test_HvLWgvPK6h36fg","MA0vRESEVMjWt3");

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
    id: list.id,
    guid: list?.guid,
    orderId: list.orderId,
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
  const upiHandler=()=>{
   if(selectedOption==="Cash"){
    SaveOrder();
   } 
   else{

var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_HvLWgvPK6h36fg', // Your api key
    amount: parseFloat(orderDetails?.grandTotal).toFixed(2)*100,
    name: 'POS',
     prefill: {
            name: "Ananad",
            email: "anandsingh181097@gmail.com",
            contact: "6200756476",
          },

          notes: {
            address: "Razorpay Corporate Office",
          },
        
    theme: {color: '#000FF'}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
  //  Alert.alert(`Success: Payment done!`);
    SaveOrder();
  }).catch((error) => {
    // handle failure
    Alert.alert(`Error: ${error.code} | ${error.description}`);
  });

   }

  }

  const SaveOrder = () => {
    const createdBy = userDetails?.userId;
    const createdDate = currentDate;
    const createdIP = userIp;
    const updatedBy = '';
    const updatedDate = null;
    const updatedIP = '';

    const id = orderDetails.id;
    const guid = orderDetails?.guid;

    /**Customer Details */
    const customerId = 0;
    const customerName = 'MOBILE TEST';
    const emailAddress = '';
    const phone = '';

    /**Amounts */
    const subTotal = orderDetails.subTotal;
    const tax = orderDetails.tax;
    const grandTotal = orderDetails.grandTotal;
    const discountAmount = 0;
    const couponAmount = '';
    const tipAmount = orderDetails?.tipAmount;
    const paymentDiscountAmount = 0;
    const addOnAmount = 0;
    const serviceCharge = generalSettings?.serviceChargeFee;
    const serviceChargeFee = orderDetails.serviceChargeFee;
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
    const orderId = orderDetails.orderId;
    const orderNumber = orderDetails.orderNumber;
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
    const modeOfPayment = selectedOption;
    const creditCardType = '';
    const paymentStatusId = 1;
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
            'Paid Successfully',
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



  useEffect(() => {
    dispatch(PaymentAction.paymentMethod('Cash'));
  }, []);

  const renderOption = option => {
    return (
      <TouchableOpacity
        key={option}
        style={[
          styles.cardSection,
          selectedOption === option && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect(option)}>
        <Text
          style={[
            styles.optionText,
            selectedOption === option && styles.selectedOptiontext,
          ]}>
          {option}
        </Text>
        {selectedOption === option && (
          <Icon name="checkmark" size={20} color="white" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />
      <Separator extraProps={{}} height={StatusBar.currentHeight} />
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Payment</Text>
        </View>
      </SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainSection}>
          <Text style={styles.mainHeader}>Choose payment method</Text>
          <View style={styles.selectPaymentCard}>
            {renderOption('Cash')}
            {renderOption('Card')}
            {renderOption('UPI')}
          </View>
        </View>
      </ScrollView>
      <View style={styles.placeOrderButtonContainer}>
        <TouchableOpacity onPress={()=>upiHandler()}>
          <Text
            style={styles.placeOrderButton}>{`Pay by ${selectedOption}`}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default Payments;
