import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
import {
  forgotPassword,
  changePassword,
  recoverPassword,
} from '../store/actions/authActions';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import Alert from '../components/Alert';
import Validation from '../components/Validation';
import Spinner from 'react-native-loading-spinner-overlay';

const PAGES = {
  RUT: 1,
  CODE_VERIFICATION: 2,
  CHANGE_PASSWORD: 3,
};

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PAGES.RUT,
      isVisible: false,
      isUnRegister: false,
      status: false,
      rut: '',
      code: '',
      password: '',
      retypePassword: '',
    };
  }
  componentDidUpdate(prevProps) {
    const {forgotpass, changepass, recoverpass, error} = this.props;
    console.log(prevProps)
    if (
      forgotpass &&
      forgotpass.status === 'success' &&
      forgotpass !== prevProps.forgotpass
    ) {
      this.setState({isVisible: true});
    }
    if (
      changepass &&
      changepass.status === 'success' &&
      changepass !== prevProps.changepass
    ) {
      this.setState({isUnRegister: true});
    }
    if (
      recoverpass &&
      recoverpass.status === 'success' &&
      recoverpass !== prevProps.recoverpass
    ) {
      this.setState({isVisible: true});
      this.props.navigation.pop();
    }
  }
  setHeaderTitle() {
    const {page} = this.state;
    switch (page) {
      case PAGES.RUT:
        return str.recoverPass;
      case PAGES.CODE_VERIFICATION:
        return str.codeValidate;
      default:
        return str.changePass;
    }
  }

  setAlertTitle() {
    const {page, status} = this.state;
    return page == PAGES.RUT && status
      ? str.unRegisteredUser
      : page == PAGES.CHANGE_PASSWORD
      ? str.existingRegi
      : str.codeSent;
  }

  setAlertSubTitle() {
    const {page, status} = this.state;
    return page == PAGES.RUT && status
      ? str.checkRut
      : page == PAGES.CHANGE_PASSWORD
      ? str.nowEnterPass
      : str.temporaryCode;
  }

  handleSubmit = () => {
    const {page, isVisible, isUnRegister, status, rut, code, password} =
      this.state;
    if (page == PAGES.RUT && status) {
      this.handleChangePassword();
      // this.setState({isUnRegister: !isUnRegister});
    } else if (page == PAGES.RUT && isVisible) {
      this.setState({page: 2, isVisible: false});
    } else if (page == PAGES.CODE_VERIFICATION) {
      this.setState({page: 3});
    } else if (page == PAGES.CHANGE_PASSWORD) {
      this.props.recoverPassword(rut, code, password);
    } else if (page == PAGES.CHANGE_PASSWORD && isVisible) {
      this.props.navigation.pop();
    } else {
      this.handleForgotPassword();
    }
  };

  handleForgotPassword() {
    this.props.forgotPassword(this.state.rut);
  }

  handleChangePassword() {
    const {password, retypePassword} = this.state;
    if (password == retypePassword) {
      this.props.changePassword(password, retypePassword);
    }
  }

  handleBack = () => {
    const {page} = this.state;
    page == PAGES.RUT ? this.props.navigation.pop() : this.setState({page: 1});
  };

  renderScreens = () => {
    const {page, status} = this.state;
    const {rut, code, password, retypePassword} = this.state;
    switch (page) {
      case PAGES.RUT:
        return (
          <View>
            <AuthInput
              label={str.rut}
              placeholder={str.enterRut}
              value={rut}
              onChangeText={e => this.setState({rut: e})}
            />
            <Validation
              onPress={() => this.setState({status: !status})}
              status={status}
            />
          </View>
        );
      case PAGES.CODE_VERIFICATION:
        return (
          <AuthInput
            label={str.code}
            placeholder={str.enterCode}
            value={code}
            onChangeText={e => this.setState({code: e})}
          />
        );
      case PAGES.CHANGE_PASSWORD:
        return (
          <View>
            <AuthInput
              label={str.password}
              placeholder={str.enterPass}
              value={password}
              onChangeText={e => this.setState({password: e})}
            />
            <AuthInput
              label={str.retypePass}
              placeholder={str.writePassAgain}
              value={retypePassword}
              onChangeText={e => this.setState({retypePassword: e})}
            />
          </View>
        );
      default:
        return null;
    }
  };

  render() {
    const {isVisible, isUnRegister} = this.state;
    const {loading} = this.props;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader
          label={this.setHeaderTitle()}
          onLeftPress={this.handleBack}
        />
        {this.renderScreens()}
        <AuthButton
          title={str.following}
          onPress={this.handleSubmit}
          style={gstyles.bottomBtn}
        />
        <Alert
          visible={isVisible || isUnRegister}
          title={this.setAlertTitle()}
          subTitle={this.setAlertSubTitle()}
          onSubmit={this.handleSubmit}
        />
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.auth?.loading,
  error: state?.auth?.error,
  forgotpass: state?.auth?.forgotpass,
  changepass: state?.auth?.changepass,
  recoverpass: state?.auth?.recoverpass,
});

const mapStateToDispatch = {
  forgotPassword,
  changePassword,
  recoverPassword,
};

export default connect(mapStateToProps, mapStateToDispatch)(ForgotPassword);
