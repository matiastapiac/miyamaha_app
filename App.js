import React, {Component} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import {openDatabase} from 'react-native-sqlite-storage';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import Navigation from './app/navigation';
import store from './app/store';
import {gstyles} from './app/common/gstyles';
import {colors} from './app/common/colors';
import {ONESIGNAL_APP_ID} from './app/common/utils';

let db = openDatabase({name: 'MiYamaha.db', createFromLocation: 1});

export default class App extends Component {
  state = {
    notificationSaved: false,
  };

  async componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
    LogBox.ignoreAllLogs();

    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(ONESIGNAL_APP_ID);
    OneSignal.Notifications.requestPermission(true);

    this.forgroundListener = OneSignal.Notifications.addEventListener(
      'foregroundWillDisplay',
      event => {
        event.preventDefault();
        event.getNotification().display();
        if (!this.state.notificationSaved) {
          this.saveNotifications(event.notification);
          this.setState({notificationSaved: true});
        }
      },
    );

    this.clickListner = OneSignal.Notifications.addEventListener(
      'click',
      event => {
        this.saveNotifications(event.notification);
      },
    );
  }

  componentWillUnmount() {
    OneSignal.Notifications.removeEventListener('click', this.clickListner);
    OneSignal.Notifications.removeEventListener(
      'foregroundWillDisplay',
      this.forgroundListener,
    );
  }

  saveNotifications = i => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Notifications',
        [],
        (tx, results) => {
          this.setState({loading: false});
          const rows = results.rows;
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            const user = rows.item(i);
            data.push(user);
          }
          const foundObject = data.find(
            item => item.notificationId === i.notificationId,
          );
          if (!foundObject) {
            db.transaction(function (tx) {
              tx.executeSql(
                'INSERT INTO Notifications(notificationId, title, body, date,flag) VALUES (?,?,?,?,?)',
                [i.notificationId, i.title, i.body, new Date(), 1],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                  } else {
                  }
                },
                error => {
                  console.log(error);
                },
              );
            });
          }
        },
        error => {
          console.error('Error fetching users', error);
        },
      );
    });
  };

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
