import React, {Component} from 'react';
import {Text, StyleSheet, View, ImageBackground, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../common/dimensions';
import {images} from '../common/images';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import TextButton from '../components/TextButton';
import {screen} from '../common/utils';

export default class Login extends Component {
  handleLogin = () => {
    this.props.navigation.push(screen.Registration);
  };
  render() {
    return (
      <ImageBackground
        source={images.background}
        resizeMode="cover"
        style={styles.container}>
        <Image source={images.logo} resizeMode="contain" style={styles.logo} />
        <View style={styles.bottomContain}>
          <AuthInput icon={images.card} placeholder={'RUT'} />
          <AuthInput icon={images.lock} placeholder={'Contraseña'} />
          <TextButton
            title={'Olvide mi contraseña'}
            font={FONTS.OpenSansMedium}
            position={'flex-end'}
          />
          <AuthButton
            title={'Iniciar sesión'}
            style={{marginVertical: 20}}
            onPress={this.handleLogin}
          />
          <View>
            <Text style={styles.text}>¿No tienes una cuenta?</Text>
            <TextButton title={'Regístrate aquí'} position={'center'} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

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
