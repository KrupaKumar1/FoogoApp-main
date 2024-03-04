import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Font from '../../../constant/Font';
import {NavigationProp} from '@react-navigation/native';
import Color from '../../../constant/Color';
import {Colors, FontSize} from '../../../CSS/GlobalStyles';

import Separator from '../../../components/General/Seperator';

const DineIn = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [selectedOption, setSelectedOption] = useState('first');
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handlePress = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" translucent />
      <SafeAreaView style={styles.container}>
        <Separator extraProps={{}} height={StatusBar.currentHeight} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.menuText}>Select a table</Text>
        </View>

        <View style={styles.cardSection}>
          <View style={styles.floorContainer}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedOption === 'first' && styles.radioButtonSelected,
              ]}
              onPress={() => handlePress('first')}>
              <Text style={styles.radioButtonText}>Cafe Area</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedOption === 'second' && styles.radioButtonSelected,
              ]}
              onPress={() => handlePress('second')}>
              <Text style={styles.radioButtonText}>First Floor </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedOption === 'third' && styles.radioButtonSelected,
              ]}
              onPress={() => handlePress('third')}>
              <Text style={styles.radioButtonText}>Second Floor</Text>
            </TouchableOpacity>
          </View>
          <Text>No.of Guests</Text>
          <View style={styles.qtySection}>
            <TouchableOpacity
              onPress={decrementQuantity}
              style={styles.qtyButton1}>
              <Text style={styles.qtyIcon}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{quantity}</Text>
            <TouchableOpacity
              onPress={incrementQuantity}
              style={styles.qtyButton2}>
              <Text style={styles.qtyIcon}>+</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.scrollView}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}>
            <View style={styles.containerCircle}>
              {[...Array(12)].map((_, index) => (
                <View key={index} style={styles.circle}>
                  <Text style={styles.number}>1</Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.buttonProceed}>
              <Text style={styles.buttonTextProceed}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.LIGHT_GREY2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Color.LIGHT_GREY2,
  },
  menuText: {
    fontSize: FontSize.size_xl,
    paddingLeft: 15,
    fontFamily: Font.POPPINS_BOLD,
  },
  scrollView: {
    flex: 1,
  },
  cardSection: {
    flex: 1,
    padding: 14,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Color.DEFAULT_WHITE,
    borderRadius: 12,
    shadowColor: '#000',
    marginBottom: 15,
  },
  floorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.colorWhitesmoke_200,
    marginRight: 10,
    borderRadius: 10,
  },
  radioButtonText: {
    color: Color.DEFAULT_BLACK,
    margin: 7,
  },
  radioButtonSelected: {
    backgroundColor: Color.PRIMARY,
  },
  radioButtonTextSelected: {
    color: Color.DEFAULT_BLACK,
    margin: 7,
  },
  qtySection: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 100,
    padding: 3,
  },
  qtyButton1: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  qtyButton2: {
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  qtyValue: {
    fontSize: 16,
    marginHorizontal: 15,
  },
  qtyIcon: {
    color: Color.DEFAULT_WHITE,
  },
  containerCircle: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.colorLimegreen,
    backgroundColor: Color.LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  containerButton: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 82,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  buttonProceed: {
    backgroundColor: Color.PRIMARY,
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonTextProceed: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DineIn;
