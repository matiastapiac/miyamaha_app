import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {data, screen} from '../common/utils';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
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
          <Text style={gstyles.dealersTitle}>{str.selectLocation}</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}>
            <PickerInput
              label={str.region}
              placeholder={str.metropolitan}
              data={data}
              setSelected={this.setRegion}
            />
            <PickerInput
              label={str.city}
              placeholder={str.santiago}
              data={data}
              setSelected={this.setCity}
            />
            <PickerInput
              label={str.commune}
              placeholder={str.counts}
              data={data}
              setSelected={this.setCommon}
            />
          </ScrollView>
          <AuthButton
            title={str.following}
            style={gstyles.bottomBtn}
            onPress={this.handleSubmit}
          />
        </View>
      </Container>
    );
  }
}
