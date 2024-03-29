import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import Separator from '../../../../components/General/Seperator';
import {SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Color from '../../../../constant/Color';
import Font from '../../../../constant/Font';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../../../../CSS/GlobalStyles';
import API_CALL from '../../../../services/Api';
import {useSelector,useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import CouponsAction from '../../../../services/redux/actions/CouponsAction';

const AllCoupons = ({navigation}) => {
  const {token, userDetails, userIp} = useSelector(
    state => state?.generalState,
  );
  const {totalAmounts} = useSelector(state => state?.appliedCouponState);
  const {couponDetails}=useSelector(state => state?.appliedCouponState);
  
  const [allCoupons, setAllCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied,setCouponApplied]=useState(null)

  const handleCouponCode = text => {
    setCouponCode(text);
  };

  const dispatch=useDispatch();

  const applyCoupon = (couponCodeApplied:any) => {
    setCouponApplied(couponCodeApplied);
    const couponObject = {
      createdBy: userDetails.fullName,
      createdDate: new Date(),
      createdIP: userIp,
      id: 0,
      customerId: 0,
      customerName: '',
      discountAmount: 0,
      couponAmount: 0,
      tipAmount: 0,
      deliveryFee: 0,
      subTotal: totalAmounts?.subTotal,
      tax: totalAmounts?.tax,
      grandTotal: totalAmounts?.total,
      orderStatusId: 0,
      modeOfPayment: '',
      paymentDiscountAmount: 0,
      addOnAmount: 0,
      serviceCharge: totalAmounts?.serviceCharge,
      serviceChargeFee: 5,
      refundAmount: 0,
      refundedTax: 0,
      refundedServiceCharge: 0,
      isPrintingFailed: true,
      orderId: 0,
      orderNumber: '',
      isServiceChargeRefund: false,
      isTaxRefund: false,
      isServiceChargePercentage: true,
      taxPercentage: 10,
      orderSource: 'POS',
      couponCode: couponCodeApplied,
      orderItems: totalAmounts.items,
    };

    API_CALL({
      method: 'POST',
      url: 'Order/ApplyCoupon',
      headerConfig: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: couponObject,
      callback: async ({status, data}) => {
        if (status === 200) {
           console.log("data123",data.data);
          if (data.data == null) {
            // Data is null, set error message from the response
            // setCouponErrorMsg(data.errorMessage);
            // setCouponAmount(0);
            // couponAmountCallback(0);
          
              Alert.alert(
            'Error',
            data.errorMessage,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
          } else if (data.data.IsSuccess) {
            // setCouponAmount(data.data.couponDiscount);
            // couponAmountCallback(data.data.couponDiscount, couponCode);
            // setAppliedCoupon({couponCode: couponCode});
            // setCouponErrorMsg('');
            // setCouponCode('');
               dispatch(
      CouponsAction.applyCoupon(data.data));
              Alert.alert(
            'Success',
            "Coupon Applied Successfully",
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
          } else {
            // Data is not null and IsSuccess is false, set error message from data
            // setCouponErrorMsg(data.data.Message);
            // setCouponAmount(0);
            // couponAmountCallback(0);
              Alert.alert(
            'Error',
            data.errorMessage,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
          }
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

  const applyButtonStyle =
    couponCode.length > 0
      ? styles.applyButtonEnabled
      : styles.applyButtonDisabled;

  const getAllCoupons = () => {
    API_CALL({
      method: 'POST',
      url: 'Coupon/GetActiveCurrentCoupons',
      headerConfig: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      callback: async ({status, data}: {status: any; data: any}) => {
        if (status === 200) {
          setAllCoupons(data.data);
           setCouponApplied(couponDetails?.coupon)
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
    getAllCoupons();
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />
      <Separator extraProps={{}} height={StatusBar.currentHeight} />
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.menuText}>All Coupons</Text>
        </View>
      </SafeAreaView>
      <View style={styles.couponTextContainer}>
        <TextInput
          style={styles.couponCode}
          value={couponCode}
          onChangeText={handleCouponCode}
          placeholder="Type coupon code here"
        />
        <TouchableOpacity>
          <Text style={applyButtonStyle}>APPLY</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.couponsHeader}>Available Coupons</Text>
      <Text style={styles.couponsHeader}>
        {parseFloat(totalAmounts?.total).toFixed(2)}
      </Text>
      <ScrollView
        style={styles.scrollView}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}>
        <View style={styles.couponSection}>
          {allCoupons?.map((item: any, index) => {
            return (
              <View style={styles.cardSection}>
                <TouchableOpacity
                  onPress={() => applyCoupon(item?.couponCode)}
                  key={index}>
                  <View style={styles.section1}>
                    <View style={styles.couponContainer}>
                      <Text key={index} style={styles.couponText}>
                        {item?.couponCode}
                      </Text>
                      <Text style={styles.description}>{item.description}</Text>
                    </View>
                    {item?.couponCode === couponApplied ? (
                      <View style={styles.appliedButtonContainer}>
                        <FontAwesome6
                          name="check-double"
                          size={15}
                          color={Color.SECONDARY_GREEN}
                        />
                        <Text style={styles.appliedButton}>APPLIED</Text>
                      </View>
                    ) : (
                      <Text style={styles.applyButton}>APPLY</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default AllCoupons;

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
  couponTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    padding: 15,
    backgroundColor: Color.LIGHT_GREY,
    borderRadius: 10,
  },
  couponCode: {
    fontSize: 16,
    fontFamily: Font.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_BLACK,
  },

  smallText: {
    fontSize: 12,
    fontFamily: Font.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_BLACK,
  },
  applyButtonEnabled: {
    color: Color.PRIMARY, // Modify this to your desired enabled button color
    fontSize: 12,
    fontFamily: Font.POPPINS_BOLD,
  },
  applyButtonDisabled: {
    color: Colors.colorDarkgray, // Modify this to your desired disabled button color
    fontSize: 12,
    fontFamily: Font.POPPINS_BOLD,
  },
  couponSection: {
    flexDirection: 'column',
    padding: 12,
  },
  couponsHeader: {
    color: Color.DEFAULT_BLACK, // Modify this to your desired disabled button color
    fontSize: 12,
    fontFamily: Font.POPPINS_SEMI_BOLD,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
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
  section1: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  couponContainer: {
    flexDirection: 'column',

    padding: 10,
    justifyContent: 'flex-start',
  },
  couponText: {
    fontSize: 16,
    fontFamily: Font.POPPINS_BOLD,
    color: Color.DEFAULT_BLACK,
  },
  description: {
    fontSize: 12,
    fontFamily: Font.POPPINS_REGULAR,
    color: Color.FABEBOOK_BLUE,
  },
  appliedButtonContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  applyButton: {
    color: Color.PRIMARY, // Modify this to your desired disabled button color
    fontSize: 12,
    fontFamily: Font.POPPINS_BOLD,
  },
  appliedButton: {
    color: Color.SECONDARY_GREEN, // Modify this to your desired disabled button color
    fontSize: 12,
    fontFamily: Font.POPPINS_BOLD,
    paddingLeft: 7,
  },
});
