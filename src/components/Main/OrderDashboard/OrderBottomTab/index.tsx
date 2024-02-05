import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {styles} from './styles';

const OrderBottomTabBar = ({orderTypes, selectedTab, handleTabPress}) => {
  const tabData = orderTypes;

  return (
    <View style={styles.bottomTabBar}>
      {tabData?.map((tab, i) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tabButton, selectedTab === i && styles.selectedTab]}
          onPress={() => handleTabPress(i, tab.items)}>
          <Text
            style={[
              styles.tabText,
              selectedTab === i && styles.tabTextSelected,
            ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OrderBottomTabBar;
