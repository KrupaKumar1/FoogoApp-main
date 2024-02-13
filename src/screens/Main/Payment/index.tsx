import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Separator from '../../../components/General/Seperator';
import Icon from 'react-native-vector-icons/Ionicons';

const Payments = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState('Cash');

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

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
        <TouchableOpacity>
          <Text
            style={styles.placeOrderButton}>{`Pay by ${selectedOption}`}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default Payments;
