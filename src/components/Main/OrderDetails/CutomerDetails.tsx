import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Color from '../../../constant/Color';

const CustomerDetails = ({onNameChange, onEmailChange, onPhoneChange,tableOrderDetails}) => {
  // State for input values
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // Handlers for input changes
  const handleCustomerNameChange = text => {
    setCustomerName(text);
    onNameChange(text);
  };

  const handlePhoneNumberChange = text => {
   
    setPhoneNumber(text);
    onPhoneChange(text)
  };

  const handleEmailChange = text => {
    setEmail(text);
    onEmailChange(text);
  };

  useEffect(()=>{

setCustomerName(tableOrderDetails?.customerName);
setEmail(tableOrderDetails?.emailAddress);
setPhoneNumber(tableOrderDetails?.phone);

  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter customer name"
        value={customerName}
        onChangeText={handleCustomerNameChange}
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={handleEmailChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
    color: Color.DEFAULT_WHITE,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.DEFAULT_GREY,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: Color.DEFAULT_BLACK,
    backgroundColor: Color.LIGHT_GREY,
  },
});

export default CustomerDetails;
