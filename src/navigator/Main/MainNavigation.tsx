import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrderDashboard from '../../screens/Main/OrderDashboard';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={OrderDashboard} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
