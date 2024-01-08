import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {openDatabase} from 'react-native-sqlite-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import ItemCard from '../components/ItemCard';
import AuthButton from '../components/AuthButton';
import Alert from '../components/Alert';
import { OneSignal } from 'react-native-onesignal';

let db = openDatabase({name: 'MiYamaha.db', createFromLocation: 1});

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      isVisible: false,
      data: {},
      notifications: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.fetchNotifications();
    this.updateNotifications();
  }

  updateNotifications = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE Notifications set flag=?',
        [0],
        (tx, results) => {
          console.log('updated');
          if (results.rowsAffected > 0) {
            OneSignal.Notifications.clearAll()
          } else {
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  fetchNotifications = () => {
    this.setState({loading: true});
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
          this.setState({notifications: data.reverse()});
        },
        error => {
          this.setState({loading: false});
          console.error('Error fetching users', error);
        },
      );
    });
  };

  removeNotification = () => {
    this.setState({loading: true});
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  Notifications where id=?',
        [this.state.selected],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            this.setState({loading: false});
            this.fetchNotifications();
          } else {
            this.setState({loading: false});
          }
        },
        error => {
          this.setState({loading: false});
        },
      );
    });
  };

  handleSelection = i => {
    this.setState({selected: i});
  };

  handleItemPress = item => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible,
      data: prevState.isVisible ? {} : item,
    }));
  };

  renderItem = ({item}) => (
    <ItemCard
      title={item.title}
      subTitle={item.body}
      selected={this.state.selected == item.id}
      onRadioPress={() => this.handleSelection(item.id)}
      leftLabel={moment(item.date).format('DD/MM/YY')}
      onPress={() => this.handleItemPress(item)}
    />
  );

  render() {
    const {isVisible, data, notifications, loading} = this.state;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.notifications} />
        <View style={[gstyles.listContainer, {marginBottom: '40%'}]}>
          <FlatList
            data={notifications}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <AuthButton
          title={str.eliminate}
          style={[
            gstyles.bottomBtn,
            {opacity: this.state.selected == 0 ? 0.6 : 1},
          ]}
          disabled={this.state.selected == 0}
          onPress={this.removeNotification}
        />
        <Alert
          visible={isVisible}
          isInfo
          btnTitle={str.close}
          title={data.title}
          subTitle={data.body}
          rightLabel={moment(data.date).format('DD/MM/YY')}
          onSubmit={this.handleItemPress}
        />
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.loading,
  error: state?.error,
});

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(Notification);
