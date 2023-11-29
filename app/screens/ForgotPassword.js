import React, {Component} from 'react';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import Alert from '../components/Alert';
import {gstyles} from '../common/gstyles';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isVisible: false,
      isUnRegister: false,
    };
  }

  setHeaderTitle() {
    const {page} = this.state;
    return page == 1
      ? 'RECUPERAR CONTRASEÑA'
      : page == 2
      ? 'CAMBIAR CONTRASEÑA'
      : 'VALIDACIÓN DE CÓDIGO ';
  }

  setAlertTitle() {
    const {page, isUnRegister} = this.state;
    return isUnRegister
      ? 'USUARIO NO REGISTRADO'
      : page == 3
      ? 'REGISTRO EXISTOSO'
      : 'CÓDIGO ENVIADO';
  }

  setAlertSubTitle() {
    const {page, isUnRegister} = this.state;
    return isUnRegister
      ? 'Verifique su número de RUT y vuelva a intentarlo'
      : page == 3
      ? 'Ahora puedes ingresar con tu password'
      : 'Hemos enviado un código provisorio a tu correo electrónico.';
  }

  handleSubmit = () => {
    const {page, isVisible, isUnRegister} = this.state;
    if (page == 1 && isVisible) {
      this.setState({page: page + 1, isVisible: false});
    } else if ((page == 3 && isVisible) || isUnRegister) {
      this.props.navigation.pop();
    } else if (page == 2) {
      this.setState({page: page + 1});
    } else {
      this.setState({isVisible: true});
    }
  };

  handleBack = () => {
    const {page} = this.state;
    page == 1 ? this.props.navigation.pop() : this.setState({page: page - 1});
  };

  render() {
    const {page, isVisible, isUnRegister} = this.state;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader
          label={this.setHeaderTitle()}
          onLeftPress={this.handleBack}
        />
        <>
          {page == 1 ? (
            <AuthInput label={'RUT'} placeholder={'Ingresa tu RUT'} />
          ) : page == 2 ? (
            <AuthInput
              label={'Código'}
              placeholder={'Ingresa el código enviado a tu correo'}
            />
          ) : (
            <>
              <AuthInput
                label={'Contraseña'}
                placeholder={'Ingresa una contraseña'}
              />
              <AuthInput
                label={'Repetir contraseña'}
                placeholder={'Vuelve a escribir la contraseña'}
              />
            </>
          )}
        </>
        <AuthButton
          title={'Siguiente'}
          onPress={this.handleSubmit}
          style={gstyles.bottomBtn}
        />
        <Alert
          visible={isVisible || isUnRegister}
          title={this.setAlertTitle()}
          subTitle={this.setAlertSubTitle()}
          onSubmit={this.handleSubmit}
        />
      </Container>
    );
  }
}
