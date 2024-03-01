import { View, Text, Platform, StatusBar, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import Font from '../../../constant/Font'
import { NavigationProp } from '@react-navigation/native'
import Color from '../../../constant/Color'

const DineIn = ({navigation}: {navigation: NavigationProp<any>}) => {
    const [selectedOption, setSelectedOption] = useState("first");
    const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handlePress = (option) => {
    setSelectedOption(option);
  };

  return (
    <SafeAreaView >
        <View >
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.menuText}>Table Selection</Text>
        <View style={styles.filterIconContainer}>
          <TouchableOpacity>
            {/* <Icon name="filter" size={30} color="black" /> */}
          </TouchableOpacity>
        </View>
      </View>
   <View style={styles.container}>
      <TouchableOpacity
        style={[styles.radioButton, selectedOption === 'first' && styles.radioButtonSelected]}
        onPress={() => handlePress('first')}
      >
        <Text style={styles.radioButtonText}>Cafe Area</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.radioButton, selectedOption === 'second' && styles.radioButtonSelected]}
        onPress={() => handlePress('second')}
      >
        <Text style={styles.radioButtonText}>First Floor </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.radioButton, selectedOption === 'third' && styles.radioButtonSelected]}
        onPress={() => handlePress('third')}
      >
        <Text style={styles.radioButtonText}>Second Floor</Text>
      </TouchableOpacity>
    </View>
      <View style={styles.containerCounter}>
      <TouchableOpacity style={styles.button} onPress={decrementQuantity}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity style={styles.button} onPress={incrementQuantity}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
    <View  style={styles.containerCircle}>
     <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
    <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
    <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
    <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
    <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
     <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
     <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
     <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
     <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
     <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
     <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
     <View style={styles.circle}>
      <Text style={styles.number}>1</Text>
    </View>
    </View>
     <View style={styles.containerButton}>
      <TouchableOpacity style={styles.buttonProceed}>
        <Text style={styles.buttonTextProceed}>Proceed</Text>
      </TouchableOpacity>
    </View>
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
 
   header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 10,
    backgroundColor: Color.LIGHT_GREY2,
  },
   menuText: {
    fontSize: 20,
    paddingLeft: 15,
    fontFamily: Font.POPPINS_BOLD, // Use appropriate Poppins font from your constants
  },
  filterIconContainer: {
    marginLeft: 'auto',
  },
   container: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent:'space-between',
    flexWrap:"nowrap",
     backgroundColor: 'transparent', 
  },
   containerCircle: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent:'space-between',
    flexWrap:"wrap"
  },
   containerCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin:15
  },
  containerButton: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop:82,
    backgroundColor: 'transparent', // Adjust as needed
    paddingHorizontal: 10, // Adjust as needed
    paddingBottom: 10, // Adjust as needed
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
  button: {
    width: 30,
    height: 30,
    backgroundColor: Color.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  quantity: {
    fontSize: 20,
  },
  radioButton: {
     flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:13,
    paddingRight:13,
    paddingBottom:15,
    paddingTop:15,
    marginVertical: 3, 
    marginHorizontal: 20
  },
  radioButtonText: {
    fontWeight: 'bold',
    color: 'orange', // Set text color to orange
    fontSize : 14
  },
  radioButtonSelected: {
    backgroundColor: Color.PRIMARY,
    color: 'white', // Set text color to orange
    fontSize:14
  },
   circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    margin:7
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },

});
export default DineIn