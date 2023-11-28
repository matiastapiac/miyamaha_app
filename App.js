import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './app/navigation';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return <Navigation />;
  }
}
