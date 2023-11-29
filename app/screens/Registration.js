import React, {Component} from 'react';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthButton from '../components/AuthButton';
import AuthInput from '../components/AuthInput';
import Alert from '../components/Alert';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isSuccess: false,
    };
  }

  handleRegister = () => {
    const {page} = this.state;
    page == 1
      ? this.setState({page: page + 1})
      : this.setState({isSuccess: true});
  };

  handleBack = () => {
    const {page} = this.state;
    page == 1 ? this.props.navigation.pop() : this.setState({page: page - 1});
  };

  render() {
    const {page, isSuccess} = this.state;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader
          label={'FORMULARIO DE REGISTRO'}
          onLeftPress={this.handleBack}
        />
        {page == 1 ? (
          <>
            <AuthInput label={'RUT'} placeholder={'Ingresa tu rut'} />
            <AuthInput
              label={'VIN'}
              placeholder={'Ingresa el VIN de tu moto'}
            />
          </>
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
        <AuthButton
          title={'Siguiente'}
          onPress={this.handleRegister}
          style={{bottom: 0, position: 'absolute'}}
        />
        <Alert
          visible={isSuccess}
          title={'REGISTRO EXITOSO'}
          subTitle={'Ahora puedes ingresar con tu contraseña'}
          onSubmit={() => this.props.navigation.pop(1)}
        />
      </Container>
    );
  }
}
