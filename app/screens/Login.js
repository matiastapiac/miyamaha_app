import React, {Component} from 'react';
import {Text, StyleSheet, View, ImageBackground, Image} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../common/dimensions';
import {images} from '../common/images';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {screen} from '../common/utils';
import {strings as str} from '../common/strings';
import {userLogin, storeAuthToken} from '../store/actions/authActions';
import {setTokenHeader} from '../store/services/Api';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import TextButton from '../components/TextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rut: '17402204-6',
      password: 'Developer@18!',
    };
  }
  componentDidMount() {
    this.loadAuthToken();
  }

  componentDidUpdate(prevProps) {
    const {login} = this.props;

    if (login?.status === 'success' && prevProps.login?.status !== 'success') {
      setTokenHeader(login?.data?.token);
      this.props.storeAuthToken(login?.data?.token);
      this.props.navigation.push(screen.DashBoard);
    }
  }

  loadAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token !== null) {
        this.props.navigation.push(screen.DashBoard);
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
    const {loading, login} = this.props;

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
        <Spinner visible={loading} color={colors.red} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.auth?.loading,
  error: state?.auth?.error,
  login: state?.auth?.login,
});

const mapStateToDispatch = {
  userLogin,
  storeAuthToken,
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
