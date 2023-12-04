import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {gstyles} from '../common/gstyles';
import {data} from '../common/utils';
import {strings as str} from '../common/strings';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthButton from '../components/AuthButton';
import AuthInput from '../components/AuthInput';
import Alert from '../components/Alert';
import Validation from '../components/Validation';
import PickerInput from '../components/PickerInput';

const PAGES = {
  RUT_VIN: 1,
  PASSWORD: 2,
  PERSONAL_INFO: 3,
  CONTACT: 4,
};

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PAGES.RUT_VIN,
      isSuccess: false,
      isStatusModal: false,
      status: false,
    };
  }

  handleRegister = () => {
    const {page, status} = this.state;
    if (page === PAGES.RUT_VIN && status) {
      this.setState({isStatusModal: true});
    } else if (
      [PAGES.PASSWORD, PAGES.PERSONAL_INFO, PAGES.CONTACT].includes(page)
    ) {
      this.setState({isSuccess: true});
    } else {
      this.setState(prevState => ({page: prevState.page + 1}));
    }
  };

  handleBack = () => {
    const {page} = this.state;
    page === PAGES.RUT_VIN
      ? this.props.navigation.pop()
      : this.setState({page: 1});
  };

  setAlertTitle() {
    const {page} = this.state;
    switch (page) {
      case PAGES.PASSWORD:
        return str.successfulRegi;
      case PAGES.PERSONAL_INFO:
        return str.submittedForm;
      default:
        return str.dataSent;
    }
  }

  setAlertSubTitle() {
    const {page} = this.state;
    switch (page) {
      case PAGES.PASSWORD:
        return str.nowLoginWithPassword;
      default:
        return str.willContactYouShortly;
    }
  }

  setHeaderTitle() {
    const {page} = this.state;
    switch (page) {
      case PAGES.RUT_VIN:
        return str.registrationForm;
      case PAGES.PASSWORD:
        return str.regiForm;
      case PAGES.PERSONAL_INFO:
        return str.registrationForm;
      case PAGES.CONTACT:
        return str.contactDealer;
      default:
        return null;
    }
  }

  renderScreens = () => {
    const {page, status} = this.state;

    switch (page) {
      case PAGES.RUT_VIN:
        return (
          <View>
            <AuthInput label={str.rut} placeholder={str.enterRut} />
            <AuthInput label={str.vin} placeholder={str.enterVin} />
            <Validation
              onPress={() => this.setState({status: !status})}
              status={status}
            />
          </View>
        );
      case PAGES.PASSWORD:
        return (
          <View>
            <AuthInput label={str.password} placeholder={str.enterPass} />
            <AuthInput
              label={str.retypePass}
              placeholder={str.writePassAgain}
            />
          </View>
        );
      case PAGES.PERSONAL_INFO:
        return (
          <View>
            <AuthInput label={str.name} placeholder={str.enterName} />
            <AuthInput label={str.surname} placeholder={str.enterLastName} />
            <AuthInput label={str.birthDate} placeholder={str.enterDOB} />
            <AuthInput label={str.email} placeholder={str.enterEmail} />
            <AuthInput label={str.telephone} placeholder={str.enterTelephone} />
          </View>
        );
      case PAGES.CONTACT:
        return (
          <View>
            <AuthInput label={str.email} placeholder={str.enterContactEmail} />
            <PickerInput
              label={str.selectADistributor}
              placeholder={str.selectTheDistributor}
              data={data}
            />
          </View>
        );
      default:
        return null;
    }
  };

  render() {
    const {isSuccess, isStatusModal} = this.state;

    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader
          label={this.setHeaderTitle()}
          onLeftPress={this.handleBack}
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex:1}}>
          {this.renderScreens()}
        </ScrollView>
        <AuthButton
          title={str.following}
          onPress={this.handleRegister}
          style={gstyles.bottomBtn}
        />
        <Alert
          visible={isSuccess}
          title={this.setAlertTitle()}
          subTitle={this.setAlertSubTitle()}
          onSubmit={() => this.props.navigation.pop(1)}
        />
        <Alert
          vStatus
          visible={isStatusModal}
          title={str.newOrUsedMotorcycle}
          subTitle={str.selectOption}
          onOld={() =>
            this.setState({page: PAGES.PERSONAL_INFO, isStatusModal: false})
          }
          onNew={() =>
            this.setState({page: PAGES.CONTACT, isStatusModal: false})
          }
        />
      </Container>
    );
  }
}
