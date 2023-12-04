import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {gstyles} from '../common/gstyles';
import {data} from '../common/utils';
import {strings as str} from '../common/strings';
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
        <TopHeader label={str.postSalesForm} />
        <ScrollView>
          <PickerInput
            placeholder={str.selectReason}
            label={str.whatReasonForQuery}
            data={data}
            setSelected={this.setReason}
          />
          <PickerInput
            placeholder={str.selectADistributor}
            label={str.selectTheDistributor}
            data={data}
            setSelected={this.setDistributor}
          />
          <AuthInput
            textarea
            label={str.writeYourQuery}
            placeholder={str.writeUsYourQuery}
          />
        </ScrollView>
        <AuthButton
          style={gstyles.bottomBtn}
          title={str.send}
          onPress={this.handleSumbit}
        />
        <Alert
          visible={isSubmited}
          title={str.submittedForm}
          subTitle={str.willSendYouEmailRespondingResponse}
          btnTitle={str.close}
          onSubmit={this.handleSumbit}
        />
      </Container>
    );
  }
}
