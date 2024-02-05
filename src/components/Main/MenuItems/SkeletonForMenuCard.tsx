import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Display from '../../../utils/Display';
import Color from '../../../constant/Color';
import Font from '../../../constant/Font';

const SkeletonForMenuCard = () => {
  return (
    <SkeletonPlaceholder backgroundColor={Color.DEFAULT_GREY}>
      <View style={styles.container}>
        <View style={styles.posterStyle} />
        <SkeletonPlaceholder>
          <View style={styles.overlayContainer}>
            <SkeletonPlaceholder>
              <View style={styles.bestsellerTag}>
                <Text style={styles.bestsellerText}>Bestseller</Text>
              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View style={styles.detailsContainer}>
                <View style={styles.textContainer}>
                  <SkeletonPlaceholder>
                    <Text style={styles.itemName}>Lorem Ipsum</Text>
                  </SkeletonPlaceholder>
                  <SkeletonPlaceholder>
                    <Text style={styles.price}>$50.00</Text>
                  </SkeletonPlaceholder>
                </View>
                <SkeletonPlaceholder>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.buttonText}>More Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </SkeletonPlaceholder>
              </View>
            </SkeletonPlaceholder>
          </View>
        </SkeletonPlaceholder>
      </View>
    </SkeletonPlaceholder>
  );
};

const borderRadiusValue = 20;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    elevation: 1,
    borderRadius: borderRadiusValue,
    backgroundColor: Color.DEFAULT_WHITE,
    marginTop: 8,
    height: Display.setWidth(30),
    overflow: 'hidden',
  },
  posterStyle: {
    width: '30%',
    height: '100%',
    borderTopLeftRadius: borderRadiusValue,
    borderBottomLeftRadius: borderRadiusValue,
    backgroundColor: Color.LIGHT_GREY,
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
    backgroundColor: Color.DEFAULT_RED,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  bestsellerText: {
    color: Color.DEFAULT_WHITE,
    fontFamily: Font.POPPINS_SEMI_BOLD,
    fontSize: 12,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textContainer: {
    marginBottom: 10,
  },
  itemName: {
    fontFamily: Font.POPPINS_BOLD,
    fontSize: 16,
    color: Color.DEFAULT_BLACK,
    marginBottom: 5,
  },
  price: {
    fontFamily: Font.POPPINS_MEDIUM,
    fontSize: 14,
    color: Color.DEFAULT_BLACK,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: Color.DEFAULT_GREY,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    width: '48%', // Adjust button width as needed
    height: '10%',
  },
  buttonText: {
    fontFamily: Font.POPPINS_SEMI_BOLD,
    fontSize: 12,
    color: Color.DEFAULT_WHITE,
    textAlign: 'center',
  },
});

export default SkeletonForMenuCard;
