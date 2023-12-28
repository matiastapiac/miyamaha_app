import React, {Component} from 'react';
import {Text, StyleSheet, View, ImageBackground, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../common/dimensions';
import {images} from '../common/images';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {screen} from '../common/utils';
import {strings as str} from '../common/strings';
import {
  userLogin,
  storeAuthToken,
  setDeviceToken,
} from '../store/actions/authActions';
import {setTokenHeader} from '../store/services/Api';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import TextButton from '../components/TextButton';
import store from '../store';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rut: '',
      password: '',
    };
  }

  componentDidMount() {
    this.loadAuthToken();
  }

  componentDidUpdate(prevProps) {
    const {login} = this.props;
    if (
      login &&
      login.status === 'success' &&
      prevProps.login?.status !== 'success'
    ) {
      setTokenHeader(login?.data?.token);
      this.props.storeAuthToken(login?.data?.token);
      this.props.setDeviceToken(uuid.v4());
      this.props.navigation.dispatch(StackActions.replace(screen.DashBoard));
    }
  }

  loadAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token !== null) {
        this.props.navigation.dispatch(StackActions.replace(screen.DashBoard));
        setTokenHeader(token);
        store.dispatch({
          type: 'LOAD_AUTH_TOKEN',
          payload: token,
        });
      }
    } catch (error) {}
  };

  handleLogin = () => {
    const {rut, password} = this.state;
    if (rut && password) {
      this.props.userLogin(rut, password);
    }
  };

  handleRegister = () => {
    this.props.navigation.push(screen.Registration);
  };

  handleForgotPassword = () => {
    this.props.navigation.push(screen.ForgotPassword);
  };

  render() {
    const {rut, password} = this.state;
    const {loading} = this.props;

    return (
      <ImageBackground
        source={images.background}
        resizeMode="cover"
        style={styles.container}>
        <Image source={images.logo} resizeMode="contain" style={styles.logo} />
        <View style={styles.bottomContain}>
          <AuthInput
            icon={images.card}
            placeholder={str.rut}
            value={rut}
            onChangeText={e => this.setState({rut: e})}
          />
          <AuthInput
            icon={images.lock}
            placeholder={str.password}
            value={password}
            secureTextEntry={true}
            onChangeText={e => this.setState({password: e})}
          />
          <TextButton
            title={str.forgotPassword}
            font={FONTS.OpenSansMedium}
            position={'flex-end'}
            onPress={this.handleForgotPassword}
          />
          <AuthButton
            title={str.login}
            style={{marginVertical: 20}}
            onPress={this.handleLogin}
            disabled={rut && password ? false : true}
          />
          <View>
            <Text style={styles.text}>{str.noAccount}</Text>
            <TextButton
              title={str.signup}
              position={'center'}
              onPress={this.handleRegister}
            />
          </View>
        </View>
        <Spinner visible={loading} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  const {loading, error, login} = state.auth;

  return {
    loading,
    error,
    login,
  };
};

const mapStateToDispatch = {
  userLogin,
  storeAuthToken,
  setDeviceToken,
};

const styles = StyleSheet.create({
  bottomContain: {
    width: wp(100),
    paddingHorizontal: wp(5),
    marginTop: 20,
  },
  text: {
    color: colors.grey,
    fontFamily: FONTS.OpenSansMedium,
    fontSize: hp(2),
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: hp(10),
    width: wp(50),
  },
});

export default connect(mapStateToProps, mapStateToDispatch)(Login);
