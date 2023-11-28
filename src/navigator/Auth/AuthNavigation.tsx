import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../../screens/Auth/Welcome';
import LoginScreen from '../../screens/Auth/LoginScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
