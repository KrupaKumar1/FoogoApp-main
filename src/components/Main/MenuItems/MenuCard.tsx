import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Font from '../../../constant/Font';
import Color from '../../../constant/Color';
import Display from '../../../utils/Display';
import AddItemModal from './AddItemModal';

const MenuCard = ({itemDetails}: {itemDetails: any}) => {
  console.log('Picture Name:', itemDetails.pictureName);
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
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
            <TouchableOpacity
              style={styles.moreDetailsButton}
              onPress={() => console.log('More Details Pressed')}>
              <Text
                style={styles.moreDetailsButtonText}>{`More Details>`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => openModal()}>
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
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
    elevation: 1,
    borderRadius: borderRadiusValue,
    backgroundColor: Color.DEFAULT_WHITE,
    marginTop: 8,
    height: Display.setWidth(30), // Adjust the height as needed
    overflow: 'hidden', // Ensure content inside the container doesn't overflow
  },
  posterStyle: {
    width: '30%',
    height: '100%',
    borderTopLeftRadius: borderRadiusValue,
    borderBottomLeftRadius: borderRadiusValue,
    borderColor: Color.DEFAULT_BLACK,
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
    fontFamily: Font.POPPINS_BOLD,
    fontSize: 16,
    color: Color.DEFAULT_BLACK,
    marginBottom: 5,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  price: {
    fontFamily: Font.POPPINS_MEDIUM,
    fontSize: 14,
    color: Color.DEFAULT_BLACK,
    marginRight: 10,
  },

  buttonConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  moreDetailsButton: {
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 5,
  },
  moreDetailsButtonText: {
    fontFamily: Font.POPPINS_SEMI_BOLD,
    fontSize: 12,
    color: Color.DEFAULT_GREY,
  },
  addButton: {
    backgroundColor: Color.DEFAULT_GREY,
    width: 70,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 5,
  },
  addButtonText: {
    fontFamily: Font.POPPINS_SEMI_BOLD,
    fontSize: 12,
    color: Color.DARK_ONE,
  },
});

export default MenuCard;
