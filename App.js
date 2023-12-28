import React, {Component} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import Navigation from './app/navigation';
import store from './app/store';
import {gstyles} from './app/common/gstyles';
import {colors} from './app/common/colors';
import {ONESIGNAL_APP_ID} from './app/common/utils';

export default class App extends Component {
  
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
    LogBox.ignoreAllLogs();

    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(ONESIGNAL_APP_ID);
    OneSignal.Notifications.requestPermission(true);
    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Navigation />
        <FlashMessage position="top" style={gstyles.flashMsg} />
      </Provider>
    );
  }
}
