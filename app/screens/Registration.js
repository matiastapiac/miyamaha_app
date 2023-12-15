import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import DocumentPicker, {types} from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
import {userRegistration, registerRejected} from '../store/actions/authActions';
import {fetchDistributors} from '../store/actions/ditributorsActions';
import {colors} from '../common/colors';
import {showMessage} from 'react-native-flash-message';
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

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PAGES.RUT_VIN,
      isSuccess: false,
      isStatusModal: false,
      status: false,
      rut: '',
      vin: '',
      password: '',
      retypePassword: '',
      name: '',
      surname: '',
      birthDate: '',
      email: '',
      telephone: '',
      address: '',
      comuna: '',
      region: '',
      document: [],
      distributors: [],
    };
  }

  componentDidMount() {
    this.getDitributors();
  }

  componentDidUpdate(prevProps) {
    const {register, distributors} = this.props;
    if (
      distributors &&
      distributors.status === 'success' &&
      distributors !== prevProps.distributors
    ) {
      const data = distributors.data.map(item => ({
        key: item.id,
        value: item.name,
      }));
      this.setState({distributors: data});
    }

    if (
      register?.status === 'success' &&
      prevProps.register?.status !== 'success'
    ) {
      this.setState({isSuccess: true});
    }
  }

  handleSubmit = () => {
    const {page, status, rut, vin} = this.state;
    if (page === PAGES.RUT_VIN && status) {
      this.setState({isStatusModal: true});
    } else if (
      [PAGES.PASSWORD, PAGES.PERSONAL_INFO, PAGES.CONTACT].includes(page)
    ) {
      this.register();
    } else {
      if (rut && vin) {
        this.setState({page: 2});
      } else {
        showMessage({
          message: str.filedCantEmpty,
          icon: 'success',
        });
      }
    }
  };

  register() {
    const {rut, vin, password, retypePassword} = this.state;
    if (password == retypePassword) {
      const formdata = new FormData();
      formdata.append('rut', rut);
      formdata.append('vin', vin);
      formdata.append('password', password);

      this.props.userRegistration(formdata);
    } else {
      showMessage({message: str.passDoNotMatch, icon: 'info'});
    }
  }

  registerMotorcycle() {
    const {
      page,
      rut,
      vin,
      name,
      surname,
      email,
      telephone,
      address,
      comuna,
      region,
      document,
      distributorId,
    } = this.state;
    const file = document[0].uri;
    const newMotorcycle = page === PAGES.PERSONAL_INFO ? true : false;
    const formdata = new FormData();
    formdata.append('rut', rut);
    formdata.append('vin', vin);
    formdata.append('firstName', name);
    formdata.append('lastName', surname);
    formdata.append('newMotorcycle', newMotorcycle);
    formdata.append('email', email);
    formdata.append('phone', telephone);
    formdata.append('address', address);
    formdata.append('commune', comuna);
    formdata.append('region', region);
    formdata.append('File', file);
    formdata.append('distributorId', distributorId);
  }

  getDitributors() {
    this.props.fetchDistributors();
  }

  handleBack = () => {
    const {page} = this.state;
    page === PAGES.RUT_VIN
      ? this.props.navigation.pop()
      : this.setState({page: 1});
  };

  pickDocument = () => {
    DocumentPicker.pick({
      type: [types.pdf, types.images],
    })
      .then(result => {
        if (result.length > 0) {
          this.setState({document: result});
        }
      })
      .catch(e => console.log(e));
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
    const {
      page,
      status,
      rut,
      vin,
      password,
      retypePassword,
      name,
      surname,
      birthDate,
      email,
      telephone,
      address,
      comuna,
      region,
      document,
      distributors,
      distributorId,
    } = this.state;

    switch (page) {
      case PAGES.RUT_VIN:
        return (
          <View>
            <AuthInput
              label={str.rut}
              placeholder={str.enterRut}
              value={rut}
              onChangeText={e => this.setState({rut: e})}
            />
            <AuthInput
              label={str.vin}
              placeholder={str.enterVin}
              value={vin}
              onChangeText={e => this.setState({vin: e})}
            />
            <Validation
              onPress={() => this.setState({status: !status})}
              status={status}
            />
          </View>
        );
      case PAGES.PASSWORD:
        return (
          <View>
            <AuthInput
              label={str.password}
              placeholder={str.enterPass}
              secureTextEntry={true}
              value={password}
              onChangeText={e => this.setState({password: e})}
            />
            <AuthInput
              label={str.retypePass}
              placeholder={str.writePassAgain}
              secureTextEntry={true}
              value={retypePassword}
              onChangeText={e => this.setState({retypePassword: e})}
            />
          </View>
        );
      case PAGES.PERSONAL_INFO:
        return (
          <View>
            <AuthInput
              label={str.name}
              placeholder={str.enterName}
              value={name}
              onChangeText={e => this.setState({name: e})}
            />
            <AuthInput
              label={str.surname}
              placeholder={str.enterLastName}
              value={surname}
              onChangeText={e => this.setState({surname: e})}
            />
            <AuthInput
              label={str.birthDate}
              placeholder={str.enterDOB}
              value={birthDate}
              onChangeText={e => this.setState({birthDate: e})}
            />
            <AuthInput
              label={str.email}
              placeholder={str.enterEmail}
              value={email}
              onChangeText={e => this.setState({email: e})}
            />
            <AuthInput
              label={str.telephone}
              placeholder={str.enterTelephone}
              value={telephone}
              onChangeText={e => this.setState({telephone: e})}
            />
            <AuthInput
              label={str.address}
              placeholder={str.enterAddress}
              value={address}
              onChangeText={e => this.setState({address: e})}
            />
            <AuthInput
              label={str.commune}
              placeholder={str.enterComuna}
              value={comuna}
              onChangeText={e => this.setState({comuna: e})}
            />
            <AuthInput
              label={str.region}
              placeholder={str.enterRegion}
              value={region}
              onChangeText={e => this.setState({region: e})}
            />
            <View style={gstyles.docView}>
              <Text style={gstyles.labelText}>{str.attachTransferDoc}</Text>
              <AuthButton
                title={str.attachFile}
                style={{backgroundColor: colors.black}}
                onPress={this.pickDocument}
              />
              {document.map((item, index) => (
                <Text key={index} style={gstyles.docText}>
                  {item.name}
                </Text>
              ))}
            </View>
          </View>
        );
      case PAGES.CONTACT:
        return (
          <View>
            <AuthInput
              label={str.email}
              placeholder={str.enterContactEmail}
              value={email}
              onChangeText={e => this.setState({email: e})}
            />
            <PickerInput
              label={str.selectADistributor}
              placeholder={str.selectTheDistributor}
              data={distributors}
              setSelected={e => this.setState({distributorId: e})}
            />
          </View>
        );
      default:
        return null;
    }
  };

  render() {
    const {isSuccess, isStatusModal} = this.state;
    const {loading, distributors} = this.props;

    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader
          label={this.setHeaderTitle()}
          onLeftPress={this.handleBack}
        />
        <View style={[gstyles.listContainer, {marginBottom: '20%', flex: 1}]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            {this.renderScreens()}
          </ScrollView>
        </View>
        <AuthButton
          title={str.following}
          onPress={this.handleSubmit}
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
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.auth?.loading,
  error: state?.auth?.error,
  register: state?.auth?.register,
  distributors: state?.distributors?.distributors,
});

const mapStateToDispatch = {
  userRegistration,
  registerRejected,
  fetchDistributors,
};

export default connect(mapStateToProps, mapStateToDispatch)(Registration);
