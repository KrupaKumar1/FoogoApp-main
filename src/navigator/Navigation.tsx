import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigation from './Auth/AuthNavigation';
import MainNavigation from './Main/MainNavigation';
import SplashScreen from '../screens/SplashScreen';

import {useSelector, useDispatch} from 'react-redux';
import {GeneralAction} from '../services/redux/actions';

const Stack = createStackNavigator();

const Navigation = () => {
  const {isAppLoading, token} = useSelector(state => state?.generalState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GeneralAction.appStart());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        {isAppLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !token ? (
          <Stack.Screen name="Auth" component={AuthNavigation} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
