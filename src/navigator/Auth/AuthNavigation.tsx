import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../../screens/Auth/Welcome';
import LoginScreen from '../../screens/Auth/LoginScreen';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  const {isFirstTimeUse} = useSelector(state => state?.generalState);

  console.log(isFirstTimeUse, 'isFirstTimeUse');

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      {isFirstTimeUse && (
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      )}
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
