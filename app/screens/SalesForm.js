import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {gstyles} from '../common/gstyles';
import {data} from '../common/utils';
import {strings as str} from '../common/strings';
import {requestPostSale} from '../store/actions/maintenanceActions';
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
    };
  }

  componentDidMount() {
    this.props.fetchDistributors();
  }

  componentDidUpdate(prevProps) {
    const {distributors} = this.props;
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
  }

  handleSumbit = () => {
    const {reason, distributor, query} = this.state;
    this.props.requestPostSale(reason, distributor, query);
    return;
    this.setState({isSubmited: !this.state.isSubmited});
  };

  setReason = e => {
    this.setState({reason: e});
  };

  setDistributor = e => {
    this.setState({distributor: e});
  };

  render() {
    const {isSubmited, query, reason, distributor, distributors} = this.state;
    const {loading} = this.props;
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
          disabled={reason && distributor && query ? false : true}
          onPress={this.handleSumbit}
        />
        <Alert
          visible={isSubmited}
          title={str.submittedForm}
          subTitle={str.willSendYouEmailRespondingResponse}
          btnTitle={str.close}
          onSubmit={this.handleSumbit}
        />
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.maintenance?.loading,
  error: state?.maintenance?.error,
  postSale: state?.maintenance?.postSale,
  distributors: state?.distributors?.distributors,
});

const mapStateToDispatch = {
  requestPostSale,
  fetchDistributors,
};

export default connect(mapStateToProps, mapStateToDispatch)(SalesForm);
