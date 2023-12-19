import React, {Component} from 'react';
import {KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
import {updateProfile, fetchProfile} from '../store/actions/authActions';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';

class EditProfile extends Component {
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
      isPickerVisibile: false,
    };
  }

  componentDidMount() {
    if (this.props?.profile) {
      const {user} = this.props?.profile?.data;
      this.setState({
        name: user?.firstName,
        surname: user?.lastName,
        dob: user?.birthdate,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        common: user?.commune,
        region: user?.region,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {profileUpdate} = this.props;
    if (
      profileUpdate &&
      profileUpdate.status === 'success' &&
      profileUpdate !== prevProps.profileUpdate
    ) {
      this.props.navigation.pop();
    }
  }

  handleChangeText = (label, text) => {
    switch (label) {
      case str.name:
        this.setState({name: text});
        break;
      case str.surname:
        this.setState({surname: text});
        break;
      case str.birthDate:
        this.setState({dob: text});
        break;
      case str.email:
        this.setState({email: text});
        break;
      case str.telephone:
        this.setState({phone: text});
        break;
      case str.address:
        this.setState({address: text});
        break;
      case str.commune:
        this.setState({common: text});
        break;
      case str.region:
        this.setState({region: text});
        break;
      default:
        break;
    }
  };

  handleUpdateProfile = () => {
    const {name, surname, dob, email, phone, address, common, region} =
      this.state;
    const data = {
      firstName: name,
      lastName: surname,
      birthdate: moment(dob).format('YYYY-MM-DD'),
      email: email,
      phone: phone,
      address: address,
      commune: common,
      region: region,
    };
    this.props.updateProfile(data);
  };

  handleConfirm = date => {
    this.setState({dob: date, isPickerVisibile: false});
  };

  render() {
    const {
      name,
      surname,
      dob,
      email,
      phone,
      address,
      common,
      region,
      isPickerVisibile,
    } = this.state;
    const {loading} = this.props;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.editProfile} />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={gstyles.listContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <AuthInput
                label={str.name}
                value={name}
                onChangeText={text => this.handleChangeText(str.name, text)}
              />
              <AuthInput
                label={str.surname}
                value={surname}
                onChangeText={text => this.handleChangeText(str.surname, text)}
              />
              <AuthInput
                label={str.birthDate}
                value={dob && moment(dob).format('DD/MM/YYYY')}
                onTouchStart={() => this.setState({isPickerVisibile: true})}
              />
              <AuthInput
                label={str.email}
                value={email}
                onChangeText={text => this.handleChangeText(str.email, text)}
              />
              <AuthInput
                label={str.telephone}
                value={phone}
                onChangeText={text =>
                  this.handleChangeText(str.telephone, text)
                }
              />
              <AuthInput
                label={str.address}
                value={address}
                onChangeText={text => this.handleChangeText(str.address, text)}
              />
              <AuthInput
                label={str.commune}
                value={common}
                onChangeText={text => this.handleChangeText(str.commune, text)}
              />
              <AuthInput
                label={str.region}
                value={region}
                onChangeText={text => this.handleChangeText(str.region, text)}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <AuthButton
          title={str.keep}
          style={gstyles.bottomBtn}
          onPress={this.handleUpdateProfile}
        />
        <DatePicker
          isVisible={isPickerVisibile}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={() => this.setState({isPickerVisibile: true})}
        />
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {loading, error, profile, profileUpdate} = state.auth;

  return {
    loading,
    error,
    profile,
    profileUpdate,
  };
};

const mapStateToDispatch = {
  updateProfile,
  fetchProfile,
};

export default connect(mapStateToProps, mapStateToDispatch)(EditProfile);
