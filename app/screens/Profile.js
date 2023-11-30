import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthInput from '../components/AuthInput';

export default class Profile extends Component {
  render() {
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={'PERFIL DE USUARIO'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthInput label={'Nombre'} placeholder={'Juan Pablo'} />
          <AuthInput label={'Apellidos'} placeholder={'Alvarado Lopez'} />
          <AuthInput label={'Fecha nacimiento'} placeholder={'30/12/1985'} />
          <AuthInput label={'Email'} placeholder={'miemail@email.cl'} />
          <AuthInput label={'Teléfono'} placeholder={'+59 9999999'} />
          <AuthInput label={'Dirección'} placeholder={''} />
        </ScrollView>
      </Container>
    );
  }
}

