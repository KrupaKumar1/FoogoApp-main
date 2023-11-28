import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {styles} from './styles';

const OrderBottomTabBar = () => {
  const [selectedTab, setSelectedTab] = useState('Tab2');

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    // Perform any other actions when a tab is pressed
  };

  return (
    <View style={styles.bottomTabBar}>
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === 'Tab1' && styles.selectedTab]}
        onPress={() => handleTabPress('Tab1')}>
        <Text
          style={[
            styles.tabText,
            selectedTab === 'Tab1' && styles.tabTextSelected,
          ]}>
          Recieved
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === 'Tab2' && styles.selectedTab]}
        onPress={() => handleTabPress('Tab2')}>
        <Text
          style={[
            styles.tabText,
            selectedTab === 'Tab2' && styles.tabTextSelected,
          ]}>
          Preparing
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === 'Tab3' && styles.selectedTab]}
        onPress={() => handleTabPress('Tab3')}>
        <Text
          style={[
            styles.tabText,
            selectedTab === 'Tab3' && styles.tabTextSelected,
          ]}>
          Completed
        </Text>
      </TouchableOpacity>
      {/* Add more tab buttons as needed */}
    </View>
  );
};

export default OrderBottomTabBar;
