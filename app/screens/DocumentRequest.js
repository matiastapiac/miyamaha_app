import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {gstyles} from '../common/gstyles';
import {data} from '../common/utils';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthButton from '../components/AuthButton';
import PickerInput from '../components/PickerInput';

export default class DocumentRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmited: false,
      docType: '',
      distributor: '',
    };
  }

  setDocType = e => {
    this.setState({docType: e});
  };

  setDistributor = e => {
    this.setState({distributor: e});
  };

  render() {
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={'SOLICITUD DE DOCUMENTOS'} />
        <ScrollView>
          <PickerInput
            label={'Selecciona el tipo de documento'}
            placeholder={'Seleciona el tipo de documento'}
            data={data}
            setSelected={this.setDocType}
          />
          <PickerInput
            label={'Selecciona un distribuidor'}
            placeholder={'Selecciona el distribuidor'}
            data={data}
            setSelected={this.setDistributor}
          />
        </ScrollView>
        <AuthButton title={'Enviar'} style={gstyles.bottomBtn} />
      </Container>
    );
  }
}
