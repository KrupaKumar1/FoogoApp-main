import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrderDashboard from '../../screens/Main/OrderDashboard';
import MenuItems from '../../screens/Main/MenuItems';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={OrderDashboard} />
      <Stack.Screen name="MenuItems" component={MenuItems} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
