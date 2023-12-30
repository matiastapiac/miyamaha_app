import React, {Component} from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {strings as str} from '../common/strings';
import {gstyles} from '../common/gstyles';
import {changePassword} from '../store/actions/authActions';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthButton from '../components/AuthButton';
import AuthInput from '../components/AuthInput';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
    };
  }

  componentDidUpdate(prevProps) {
    const {changepass} = this.props;
    if (
      changepass &&
      changepass.status === 'success' &&
      changepass !== prevProps.changepass
    ) {
      this.props.navigation.pop();
    }
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleSubmit = () => {
    const {password, newPassword} = this.state;
    this.props.changePassword(password, newPassword);
  };

  render() {
    const {password, newPassword} = this.state;
    const {loading} = this.props;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.changePass} onLeftPress={this.handleBack} />
        <AuthInput
          label={str.enterPass}
          placeholder={str.password}
          secureTextEntry={true}
          value={password}
          onChangeText={e => this.setState({password: e})}
        />
        <AuthInput
          label={str.enterNewPass}
          placeholder={str.newPass}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={e => this.setState({newPassword: e})}
        />
        <AuthButton
          title={str.following}
          onPress={this.handleSubmit}
          style={gstyles.bottomBtn}
          disabled={!password || !newPassword}
        />
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {loading, error, changepass} = state.auth;

  return {
    loading,
    error,
    changepass,
  };
};

const mapStateToDispatch = {
  changePassword,
};

export default connect(mapStateToProps, mapStateToDispatch)(ChangePassword);
