import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screen} from '../common/utils';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import ForgotPassword from '../screens/ForgotPassword';
import { BottomTab } from './BottomTab';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={screen.Login} component={Login} />
        <Stack.Screen name={screen.Registration} component={Registration} />
        <Stack.Screen name={screen.ForgotPassword} component={ForgotPassword} />
        <Stack.Screen name={screen.DashBoard} component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
