import React, {Component} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './app/navigation';
import store from './app/store';

export default class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
    LogBox.ignoreAllLogs();
  }
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
