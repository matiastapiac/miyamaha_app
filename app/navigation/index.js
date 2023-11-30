import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screen} from '../common/utils';
import {BottomTab} from './BottomTab';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import ForgotPassword from '../screens/ForgotPassword';
import Profile from '../screens/Profile';
import Notification from '../screens/Notification';
import SalesForm from '../screens/SalesForm';
import MyDocuments from '../screens/MyDocuments';
import DocumentRequest from '../screens/DocumentRequest';
import Manuals from '../screens/Manuals';
import DocumentList from '../screens/DocumentList';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={screen.Login} component={Login} />
        <Stack.Screen name={screen.Registration} component={Registration} />
        <Stack.Screen name={screen.ForgotPassword} component={ForgotPassword} />
        <Stack.Screen name={screen.DashBoard} component={BottomTab} />
        <Stack.Screen
          name={screen.Profile}
          component={Profile}
          options={{
            gestureDirection: 'vertical',
          }}
        />
        <Stack.Screen
          name={screen.Notification}
          component={Notification}
          options={{
            gestureDirection: 'vertical',
          }}
        />
        <Stack.Screen
          name={screen.SalesForm}
          component={SalesForm}
          options={{
            gestureDirection: 'vertical',
          }}
        />
        <Stack.Screen
          name={screen.MyDocuments}
          component={MyDocuments}
          options={{
            gestureDirection: 'vertical',
          }}
        />
        <Stack.Screen
          name={screen.DocumentRequest}
          component={DocumentRequest}
          options={{
            gestureDirection: 'vertical',
          }}
        />
        <Stack.Screen
          name={screen.Manuals}
          component={Manuals}
          options={{
            gestureDirection: 'vertical',
          }}
        />
        <Stack.Screen name={screen.DocumentList} component={DocumentList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
