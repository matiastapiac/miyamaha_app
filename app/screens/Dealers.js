import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {data, screen} from '../common/utils';
import {gstyles} from '../common/gstyles';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import PickerInput from '../components/PickerInput';
import AuthButton from '../components/AuthButton';

export default class Dealers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmited: false,
      region: '',
      city: '',
      common: '',
    };
  }

  setRegion = e => {
    this.setState({region: e});
  };
  setCity = e => {
    this.setState({city: e});
  };
  setCommon = e => {
    this.setState({common: e});
  };

  handleSubmit = () => {
    this.props.navigation.push(screen.SerachDealers);
  };

  render() {
    return (
      <Container>
        <TopHeader />
        <View style={[gstyles.itemConatiner, gstyles.notifContent]}>
          <Text style={gstyles.dealersTitle}>Selecciona una ubicación</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}>
            <PickerInput
              label={'Región'}
              placeholder={'Metropolitana'}
              data={data}
              setSelected={this.setRegion}
            />
            <PickerInput
              label={'Ciudad'}
              placeholder={'Santiago'}
              data={data}
              setSelected={this.setCity}
            />
            <PickerInput
              label={'Comuna'}
              placeholder={'Las Condes'}
              data={data}
              set
              Selected={this.setCommon}
            />
          </ScrollView>
          <AuthButton
            title={'Siguiente'}
            style={gstyles.bottomBtn}
            onPress={this.handleSubmit}
          />
        </View>
      </Container>
    );
  }
}
