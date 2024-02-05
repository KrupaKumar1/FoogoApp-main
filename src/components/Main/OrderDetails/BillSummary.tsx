import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, FontSize} from '../../../CSS/GlobalStyles';
import Color from '../../../constant/Color';
import Font from '../../../constant/Font';
import Modal from 'react-native-modal';

import CrossIcon from 'react-native-vector-icons/Entypo';

const BillSummary = props => {
  const {isVisible, closeModal} = props;
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
