import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
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
  render() {
    const {page} = this.state;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={'FORMULARIO DE REGISTRO'} />
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
        <Alert visible={isSuccess} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
