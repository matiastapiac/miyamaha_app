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
import SerachDealers from '../screens/SerachDealers';
import EditProfile from '../screens/EditProfile';
import ScheduleMaintenance from '../screens/ScheduleMaintenance';

const Stack = createNativeStackNavigator();

const screens = [
  {name: screen.Login, component: Login, nav: 'horizontal'},
  {name: screen.Registration, component: Registration, nav: 'horizontal'},
  {name: screen.ForgotPassword, component: ForgotPassword, nav: 'horizontal'},
  {name: screen.DashBoard, component: BottomTab, nav: 'horizontal'},
  {name: screen.Profile, component: Profile, nav: 'vertical'},
  {name: screen.Notification, component: Notification, nav: 'vertical'},
  {name: screen.SalesForm, component: SalesForm, nav: 'vertical'},
  {name: screen.MyDocuments, component: MyDocuments, nav: 'vertical'},
  {name: screen.DocumentRequest, component: DocumentRequest, nav: 'vertical'},
  {name: screen.Manuals, component: Manuals, nav: 'vertical'},
  {name: screen.DocumentList, component: DocumentList, nav: 'horizontal'},
  {name: screen.SerachDealers, component: SerachDealers, nav: 'vertical'},
  {name: screen.EditProfile, component: EditProfile, nav: 'horizontal'},
  {
    name: screen.ScheduleMaintenance,
    component: ScheduleMaintenance,
    nav: 'vertical',
  },
];

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {screens.map((item, index) => (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              gestureDirection: item.nav,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
