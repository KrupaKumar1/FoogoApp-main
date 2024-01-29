import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrderDashboard from '../../screens/Main/OrderDashboard';
import MenuItems from '../../screens/Main/MenuItems';
import OrderDetails from '../../screens/Main/OrderDetails/OrderDetails';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={OrderDashboard} />
      <Stack.Screen name="MenuItems" component={MenuItems} />
      <Stack.Screen name="Cart" component={OrderDetails} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
