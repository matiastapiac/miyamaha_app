import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
import {
  requestPostSale,
  getPostSaleReasons,
} from '../store/actions/maintenanceActions';
import {fetchDistributors} from '../store/actions/ditributorsActions';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import PickerInput from '../components/PickerInput';
import AuthInput from '../components/AuthInput';
import Alert from '../components/Alert';
import AuthButton from '../components/AuthButton';

class SalesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmited: false,
      reason: '',
      distributor: '',
      query: '',
      distributors: [],
      reasons: [],
    };
  }

  componentDidMount() {
    this.props.fetchDistributors();
    this.props.getPostSaleReasons();
  }

  componentDidUpdate(prevProps) {
    const {distributors, postSaleReasons, postSale} = this.props;
    if (
      distributors &&
      distributors.status === 'success' &&
      distributors !== prevProps.distributors
    ) {
      const data = [];
      distributors.data.map(i => data.push({key: i.id, value: i.name}));
      this.setState({
        distributors: data,
      });
    }

    if (
      postSaleReasons &&
      postSaleReasons.status === 'success' &&
      postSaleReasons !== prevProps.postSaleReasons
    ) {
      const data = [];
      postSaleReasons.data.map(i => data.push({key: i, value: i}));
      this.setState({
        reasons: data,
      });
    }

    if (
      postSale &&
      postSale.status === 'success' &&
      postSale !== prevProps.postSale
    ) {
      this.setState({isSubmited: true});
    }
  }

  handleSumbit = () => {
    const {reason, distributor, query} = this.state;
    this.props.requestPostSale(reason, distributor, query);
  };

  setReason = e => {
    this.setState({reason: e});
  };

  setDistributor = e => {
    this.setState({distributor: e});
  };

  render() {
    const {isSubmited, query, reason, distributor, distributors, reasons} =
      this.state;
    const {loading} = this.props;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.postSalesForm} />
        <ScrollView>
          <PickerInput
            placeholder={str.selectReason}
            label={str.whatReasonForQuery}
            data={reasons}
            setSelected={this.setReason}
          />
          <PickerInput
            placeholder={str.selectADistributor}
            label={str.selectTheDistributor}
            data={distributors}
            setSelected={this.setDistributor}
          />
          <AuthInput
            textarea
            label={str.writeYourQuery}
            placeholder={str.writeUsYourQuery}
            value={query}
            onChangeText={e => this.setState({query: e})}
          />
        </ScrollView>
        <AuthButton
          style={gstyles.bottomBtn}
          title={str.send}
          disabled={!reason || !distributor || !query}
          onPress={this.handleSumbit}
        />
        <Alert
          visible={isSubmited}
          title={str.submittedForm}
          subTitle={str.willSendYouEmailRespondingResponse}
          btnTitle={str.close}
          onSubmit={() => this.props.navigation.pop()}
        />
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {loading, error, postSale, postSaleReasons} = state.maintenance;
  const {distributors} = state.distributors;

  return {
    loading,
    error,
    postSale,
    postSaleReasons,
    distributors,
  };
};

const mapStateToDispatch = {
  requestPostSale,
  getPostSaleReasons,
  fetchDistributors,
};

export default connect(mapStateToProps, mapStateToDispatch)(SalesForm);
