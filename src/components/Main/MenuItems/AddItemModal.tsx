// AddItemModal.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import Display from '../../../utils/Display';
import Color from '../../../constant/Color';
import {CheckBox} from 'react-native-elements';

const AddItemModal = ({isVisible, closeModal, itemDetails}) => {
  const [selectedPack, setSelectedPack] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState({
    addon1: false,
    addon2: false,
    // Add more addons as needed
  });
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.7}>
      <View style={styles.modalContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.itemName}>{itemDetails?.name}</Text>
          <Text style={styles.price}>{`$${itemDetails?.deliveryPrice}`}</Text>
        </View>

        {/* Body (ScrollView) */}
        <ScrollView style={styles.body}>
          {/* Section 1 */}
          <View style={styles.qtySection}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Text style={styles.qtyIcon}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.qtyValue}
              value={quantity.toString()}
              keyboardType="numeric"
              onChangeText={text => {
                const numericValue = parseInt(text) || 0;
                setQuantity(Math.max(1, numericValue)); // Ensure quantity is at least 1
              }}
            />
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.qtyIcon}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          {/* Section 2 */}
          <Text style={styles.descriptionHeading}>Description</Text>
          <Text>{itemDetails?.description}</Text>
          <View style={styles.separator} />

          {/* Section 3 */}
          <View style={styles.subItemSection}>
            <Text style={styles.descriptionHeading}>Select Pack</Text>

            {/* Sub Item Pack Selection */}
            <View style={styles.packSelection}>
              <TouchableOpacity
                style={[
                  styles.packButton,
                  selectedPack === 'full' && styles.selectedPack,
                ]}
                onPress={() => setSelectedPack('full')}>
                <Text
                  style={[
                    styles.subItemText,
                    selectedPack === 'full' && styles.selectedItemText,
                  ]}>
                  Full $400
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.packButton,
                  selectedPack === 'half' && styles.selectedPack,
                ]}
                onPress={() => setSelectedPack('half')}>
                <Text>Half $100</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separator} />
          {/* Section 4 */}
          <View style={styles.addonSection}>
            <Text style={styles.descriptionHeading}>Addons</Text>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkboxItem}>
                <CheckBox
                  value={addons.addon1}
                  checked
                  onValueChange={value => setAddons({...addons, addon1: value})}
                />
                <Text>Addon 1</Text>
              </View>
              <View style={styles.checkboxItem}>
                <CheckBox
                  value={addons.addon1}
                  onValueChange={value => setAddons({...addons, addon2: value})}
                />
                <Text>Addon 2</Text>
              </View>
            </View>

            {/* Add more addons as needed */}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <View style={styles.footerShadow} />
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.footerButtonCancel}
              onPress={closeModal}>
              <Text style={styles.footerButtonTextCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => {
                /* Handle ADD */
              }}>
              <Text style={styles.footerButtonTextAdd}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // height: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.LIGHT_GREY2,
    borderBottomWidth: 1,
    borderBottomColor: Color.DEFAULT_GREY,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: 'green', // Set your desired color
  },
  body: {
    padding: 16,
  },
  footerContainer: {
    position: 'relative',
  },
  footerShadow: {
    position: 'absolute',
    top: -1, // Adjust as needed
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Display.setHeight(5),
    backgroundColor: Color.DEFAULT_WHITE,
    borderRadius: 5,
    overflow: 'hidden',
  },
  footerButtonCancel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.PRIMARY,
    borderRadius: 5,
  },
  footerButtonTextCancel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.DEFAULT_BLACK,
  },
  footerButtonTextAdd: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.DEFAULT_WHITE,
  },

  qtySection: {
    flexDirection: 'row',
    padding: 8,
  },
  qtyButton: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  qtyValue: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  qtyIcon: {
    color: Color.DEFAULT_WHITE,
  },
  subItemSection: {
    flexDirection: 'column',
  },

  separator: {
    height: 1,
    backgroundColor: Color.DEFAULT_GREY,
    marginVertical: 10,
  },
  descriptionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subItemPackSection: {
    padding: 16,
  },
  addonSection: {},
  packSelection: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  packButton: {
    backgroundColor: Color.LIGHT_GREY2,
    padding: 8,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 100,
    marginHorizontal: 5,
  },
  subItemText: {
    color: Color.DEFAULT_BLACK,
  },
  selectedItemText: {
    color: Color.DEFAULT_WHITE,
  },
  selectedPack: {
    backgroundColor: Color.PRIMARY,
    color: Color.DEFAULT_WHITE,
  },
  checkboxContainer: {
    flexDirection: 'column',
    marginVertical: 5,
    backgroundColor: Color.LIGHT_GREEN,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddItemModal;
