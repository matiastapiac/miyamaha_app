import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {gstyles} from '../common/gstyles';
import {screen} from '../common/utils';
import {images} from '../common/images';
import {colors} from '../common/colors';
import {strings as str} from '../common/strings';
import {fetchProfile, userLogout} from '../store/actions/authActions';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import ItemCard from '../components/ItemCard';
import store from '../store';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      dob: '',
      email: '',
      phone: '',
      address: '',
      common: '',
      region: '',
      vehicles: [],
    };
  }

  componentDidMount() {
    this.props.fetchProfile();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.fetchProfile();
    });
  }

  componentDidUpdate(prevProps) {
    const {profile, logout} = this.props;
    if (
      profile &&
      profile.status === 'success' &&
      profile !== prevProps.profile
    ) {
      const {user, motorcycles} = profile?.data;
      this.setState({
        name: user?.firstName,
        surname: user?.lastName,
        dob: user?.birthdate,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        common: user?.commune,
        region: user?.region,
        vehicles: motorcycles,
      });
    }

    if (logout && logout.status === 'success' && logout !== prevProps.logout) {
      this.handleLogoutAct();
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleLogoutAct = async () => {
    await AsyncStorage.removeItem('authToken');
    store.dispatch({
      type: 'REMOVE_AUTH_TOKEN',
      payload: null,
    });
    this.props.navigation.push(screen.Login);
  };

  handleEditProfile = () => {
    this.props.navigation.push(screen.EditProfile);
  };

  handleLogout = () => {
    this.props.userLogout();
  };

  handleChangePassword = () => {
    this.props.navigation.push(screen.ChangePassword);
  };

  render() {
    const {
      name,
      surname,
      dob,
      phone,
      address,
      common,
      email,
      region,
      vehicles,
    } = this.state;
    const {loading} = this.props;

    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader
          label={str.userProfile}
          rightIcon={images.menu}
          iColor={colors.red}
          onMenu1={this.handleChangePassword}
          onMenu2={this.handleLogout}
        />
        <View style={[gstyles.listContainer, {marginBottom: '40%'}]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthInput label={str.name} value={name} editable={false} />
            <AuthInput label={str.surname} value={surname} editable={false} />
            <AuthInput
              label={str.birthDate}
              value={dob && moment(dob).format('DD/MM/YYYY')}
              editable={false}
            />
            <AuthInput label={str.email} value={email} editable={false} />
            <AuthInput label={str.telephone} value={phone} editable={false} />
            <AuthInput label={str.address} value={address} editable={false} />
            <AuthInput label={str.commune} value={common} editable={false} />
            <AuthInput label={str.region} value={region} editable={false} />
            {vehicles.length > 0 && (
              <>
                <Text style={gstyles.fjallaText}>{str.registeredVehicles}</Text>
                {vehicles.map((vehicle, index) => (
                  <ItemCard
                    key={index}
                    title={vehicle.modelCode}
                    subTitle={'VIN: ' + vehicle.vin}
                    icon={vehicle.photoUrl}
                    style={gstyles.vehicleContent}
                  />
                ))}
              </>
            )}
          </ScrollView>
        </View>
        <AuthButton
          title={str.editProfile}
          style={gstyles.bottomBtn}
          onPress={this.handleEditProfile}
        />
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {loading, error, profile, logout} = state.auth;

  return {
    loading,
    error,
    profile,
    logout,
  };
};

const mapStateToDispatch = {
  fetchProfile,
  userLogout,
};

export default connect(mapStateToProps, mapStateToDispatch)(Profile);
