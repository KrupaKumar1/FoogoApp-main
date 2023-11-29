import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {styles} from './styles';

const OrderBottomTabBar = ({selectedTab, handleTabPress}) => {
  const tabData = [
    {id: 'Tab1', label: 'Received'},
    {id: 'Tab2', label: 'Preparing'},
    {id: 'Tab3', label: 'Completed'},
    // Add more tab data as needed
  ];

  return (
    <View style={styles.bottomTabBar}>
      {tabData.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tabButton,
            selectedTab === tab.id && styles.selectedTab,
          ]}
          onPress={() => handleTabPress(tab.id)}>
          <Text
            style={[
              styles.tabText,
              selectedTab === tab.id && styles.tabTextSelected,
            ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OrderBottomTabBar;
