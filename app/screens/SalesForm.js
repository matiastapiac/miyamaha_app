import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {gstyles} from '../common/gstyles';
import {data} from '../common/utils';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import PickerInput from '../components/PickerInput';
import AuthInput from '../components/AuthInput';
import Alert from '../components/Alert';
import AuthButton from '../components/AuthButton';

export default class SalesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmited: false,
      reason: '',
      distributor: '',
    };
  }

  handleSumbit = () => {
    this.setState({isSubmited: !this.state.isSubmited});
  };

  setReason = e => {
    this.setState({reason: e});
  };

  setDistributor = e => {
    this.setState({distributor: e});
  };

  render() {
    const {isSubmited} = this.state;

    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={'FORMULARIO POST VENTA'} />
        <ScrollView>
          <PickerInput
            placeholder={'Selecciona una razón'}
            label={'¿Cuál es la razón de tu consulta?'}
            data={data}
            setSelected={this.setReason}
          />
          <PickerInput
            placeholder={'Selecciona el distribuidor'}
            label={'Selecciona un distribuidor'}
            data={data}
            setSelected={this.setDistributor}
          />
          <AuthInput
            textarea
            label={'Escribe tu consulta'}
            placeholder={'Escríbenos tu consulta'}
          />
        </ScrollView>
        <AuthButton
          style={gstyles.bottomBtn}
          title={'Enviar'}
          onPress={this.handleSumbit}
        />
        <Alert
          visible={isSubmited}
          title={'FORMULARIO ENVIADO'}
          subTitle={'Te enviaremos un correo respondiendo tu solicitud'}
          btnTitle={'Cerrar'}
          onSubmit={this.handleSumbit}
        />
      </Container>
    );
  }
}
