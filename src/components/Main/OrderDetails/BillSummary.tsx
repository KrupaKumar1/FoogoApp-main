import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, FontSize} from '../../../CSS/GlobalStyles';
import Color from '../../../constant/Color';
import Font from '../../../constant/Font';
import Modal from 'react-native-modal';

import CrossIcon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const BillSummary = (props: any) => {
  const {isVisible, closeModal, totals} = props;
  const {subTotal, tax, serviceCharge, total,tipAmount,couponDiscount} = totals;

  const {generalSettings} = useSelector(state => state?.generalSettingsState);
 

  return (
    <Modal
      isVisible={isVisible}
      //   onBackdropPress={closeModal}
      //   onBackButtonPress={closeModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      //   backdropOpacity={0.7}
      style={styles.billContainer}>
      <TouchableOpacity
        onPress={() => closeModal()}
        style={styles.closeButtonContainer}>
        <View style={styles.crossIconContainer}>
          <CrossIcon name="cross" size={25} style={styles.crossIcon} />
        </View>
      </TouchableOpacity>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bill Summary</Text>
        </View>
        <View style={styles.billCalc}>
          <View style={styles.cardSection}>
            <View style={styles.section1}>
              <View style={styles.couponContainer}>
                <Ionicons
                  name="fast-food-outline"
                  size={20}
                  style={styles.couponIcon}
                  color={Colors.colorBlack}
                />
                <Text style={styles.cardTitle}>Sub Total</Text>
              </View>
              <Text style={styles.cardTitle}>
                {generalSettings?.currencyCode}
                {subTotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.section1}>
              <View style={styles.couponContainer}>
                <MaterialCommunity
                  name="bank-outline"
                  size={20}
                  style={styles.couponIcon}
                  color={Colors.colorBlack}
                />
                <Text
                  style={
                    styles.cardTitle
                  }>{`${generalSettings?.taxLabelName} (${generalSettings?.taxPercentage})%`}</Text>
              </View>
              <Text style={styles.cardTitle}>
                {generalSettings?.currencyCode}
                {(couponDiscount?.tax?couponDiscount.tax:tax).toFixed(2)}
              </Text>
            </View>
            <View style={styles.section1}>
              <View style={styles.couponContainer}>
                <MaterialCommunity
                  name="bank-outline"
                  size={20}
                  style={styles.couponIcon}
                  color={Colors.colorBlack}
                />
                <Text style={styles.cardTitle}>
                  {`${generalSettings?.serviceChargeLabelName} (${generalSettings?.serviceChargeFee})%`}
                </Text>
              </View>
              <Text style={styles.cardTitle}>
                {generalSettings?.currencyCode}
                {serviceCharge.toFixed(2)}
              </Text>
            </View>

            {/* <View style={styles.billItem}>
              <Text>Coupon Value</Text>
              <Text style={styles.reducedAmountText}>
                - {generalSettings?.currencyCode}5.00
              </Text>
            </View> */}
     { tipAmount>0 &&       <View style={styles.section1}>
              <View style={styles.couponContainer}>
                <Ionicons
                  name="fast-food-outline"
                  size={20}
                  style={styles.couponIcon}
                  color={Colors.colorBlack}
                />
                <Text style={styles.cardTitle}>Tip Amount</Text>
              </View>
              <Text style={styles.cardTitle}>
                {generalSettings?.currencyCode}
                {parseFloat(tipAmount).toFixed(2)}
              </Text>
            </View>
}
 { couponDiscount?.couponDiscount>0 &&       <View style={styles.section1}>
              <View style={styles.couponContainer}>
                <Ionicons
                  name="fast-food-outline"
                  size={20}
                  style={styles.couponIcon}
                  color={Colors.colorBlack}
                />
                <Text style={styles.cardTitle}>Coupon Discount</Text>
              </View>
              <Text style={styles.cardTitle}>
                -{generalSettings?.currencyCode}
                {parseFloat(couponDiscount?.couponDiscount).toFixed(2)}
              </Text>
            </View>
}

            <View style={styles.billItem}>
              <Text style={styles.totalDue}>Total Due Amount</Text>
              <Text style={styles.totalDue}>
                {generalSettings?.currencyCode}{
          couponDiscount &&     couponDiscount?.tax >0 ? parseFloat(Number(total)+Number(tipAmount)-Number(couponDiscount?.couponDiscount)-Number(tax)+Number(couponDiscount?.tax)).toFixed(2)
                  :
                  parseFloat(Number(total)+Number(tipAmount)).toFixed(2)
                }
                
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BillSummary;

const styles = StyleSheet.create({
  billContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  section1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponIcon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: Font.POPPINS_SEMI_BOLD,
    color: Color.DEFAULT_BLACK,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.LIGHT_GREY2,
    // borderBottomWidth: 1,
    // borderBottomColor: Color.LIGHT_GREY,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  billCalc: {
    flex: 1,
    backgroundColor: Color.LIGHT_GREY2,
  },
  headerText: {
    fontSize: FontSize.size_base,
    color: Color.DEFAULT_BLACK,
    fontFamily: Font.POPPINS_BOLD,
  },
  cardSection: {
    padding: 14,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Color.DEFAULT_WHITE,
    borderRadius: 12,
    shadowColor: '#000',
    margin: 10,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: '40%',
    marginBottom: 5,
    transform: [{translateY: -50}, {translateX: 180}], // Half of the height of the closeButtonContainer
    zIndex: 1, // Ensure the close button is on top
  },
  crossIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Apply opacity here
    borderRadius: 40,
    padding: 5,
  },
  crossIcon: {
    color: Color.DEFAULT_WHITE,
    padding: 5,
    borderRadius: 20,
  },

  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
  },
  totalDue: {
    fontSize: FontSize.size_xl,
    color: Color.DEFAULT_BLACK,
    fontFamily: Font.POPPINS_BOLD,
  },
  reducedAmountText: {
    color: '#d11a2a',
  },
});
