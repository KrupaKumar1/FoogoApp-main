import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';
import React, { useState } from 'react';
import Color from '../../constant/Color';


const containerStyle = (size, isActive) => ({
  backgroundColor: isActive ? Color.DEFAULT_GREEN : Color.DEFAULT_GREY,
  height: 32 * size,
  width: 64 * size,
  borderRadius: 32,
  padding: 4 * size,
});

const toogleStyle = (size, animatedValue) => ({
  height: 24 * size,
  width: 24 * size,
  borderRadius: 32,
  backgroundColor: Color.DEFAULT_WHITE,
  transform: [
    {
      translateX: animatedValue,
    },
  ],
});

const ToggleButton = ({ size }) => {
  const [isActive, setIsActive] = useState(false);

  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  const toggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 0 : 32 * size,
      duration: 250,
      easing: Easing.bounce,
      delay: 0,
      useNativeDriver: true,
    }).start();

    setIsActive(!isActive);
  };

  return (
    <TouchableOpacity
      style={containerStyle(size, isActive)}
      onPress={() => toggleSwitch()}
      activeOpacity={0.8}
    >
      <Animated.View style={toogleStyle(size, animatedValue)} />
    </TouchableOpacity>
  );
};

export default ToggleButton;