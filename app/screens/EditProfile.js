import React, {Component} from 'react';
import {KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
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
    };
  }

  componentDidMount() {
    if (this.props?.profile) {
      const {user} = this.props?.profile?.data;
      this.setState({
        name: user?.firstName,
        surname: user?.lastName,
        dob: '',
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        common: user?.commune,
        region: user?.region,
      });
    }
  }

  setUserData() {
    const {user} = this.props?.route?.params;
    this.setState({
      name: user.name,
      surname: user.surname,
      dob: user.dob,
      email: user.email,
      phone: user.phone,
      address: user.address,
      common: user.common,
      region: user.region,
    });
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
      email: email,
      phone: phone,
      address: address,
      commune: common,
      region: region,
    };
    this.props.updateProfile(data);
  };

  render() {
    const {name, surname, dob, email, phone, address, common, region} =
      this.state;
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
                value={dob}
                onChangeText={text =>
                  this.handleChangeText(str.birthDate, text)
                }
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.auth?.loading,
  error: state?.auth?.error,
  profile: state?.auth?.profile,
});

const mapStateToDispatch = {
  updateProfile,
  fetchProfile,
};

export default connect(mapStateToProps, mapStateToDispatch)(EditProfile);
