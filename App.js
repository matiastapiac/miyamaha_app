import React, {Component} from 'react';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './app/navigation';

export default class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
    LogBox.ignoreAllLogs();
  }
  render() {
    return <Navigation />;
  }
}
