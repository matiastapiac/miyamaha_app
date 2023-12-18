import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
import {
  lostDocumentRequest,
  getDocumentTypes,
} from '../store/actions/documentActions';
import {fetchDistributors} from '../store/actions/ditributorsActions';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthButton from '../components/AuthButton';
import PickerInput from '../components/PickerInput';

class DocumentRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmited: false,
      docType: '',
      distributor: 0,
      distributors: [],
      types: [],
    };
  }

  componentDidMount() {
    this.props.getDocumentTypes();
    this.props.fetchDistributors();
  }

  componentDidUpdate(prevProps) {
    const {docTypes, distributors, lost} = this.props;

    if (docTypes?.status === 'success' && docTypes !== prevProps.docTypes) {
      const types = [];
      docTypes.data.map(i => types.push({key: i, value: i}));
      this.setState({
        types,
      });
    }
    if (
      distributors?.status === 'success' &&
      distributors !== prevProps.distributors
    ) {
      const data = [];
      distributors.data.map(i => data.push({key: i.id, value: i.name}));
      this.setState({
        distributors: data,
      });
    }
    if (lost && lost.status === 'success' && lost !== prevProps.lost) {
      this.props.navigation.pop();
    }
  }

  handleRequestDocument = () => {
    const {docType, distributor} = this.state;
    this.props.lostDocumentRequest(docType, distributor);
  };

  setDocType = e => {
    this.setState({docType: e});
  };

  setDistributor = e => {
    this.setState({distributor: e});
  };

  render() {
    const {types, distributors, docType, distributor} = this.state;
    const {loading} = this.props;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.docRequest} />
        <ScrollView>
          <PickerInput
            label={str.selectTypeOfDoc}
            placeholder={str.selectTypeOfDoc}
            data={types}
            setSelected={this.setDocType}
          />
          <PickerInput
            key={'key'}
            label={str.selectADistributor}
            placeholder={str.selectTheDistributor}
            data={distributors}
            setSelected={this.setDistributor}
          />
        </ScrollView>
        <AuthButton
          title={str.send}
          style={gstyles.bottomBtn}
          onPress={this.handleRequestDocument}
          disabled={docType && distributor != 0 ? false : true}
        />
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.document?.loading,
  error: state?.document?.error,
  lost: state?.document?.lost,
  docTypes: state?.document?.docTypes,
  distributors: state?.distributors?.distributors,
});

const mapStateToDispatch = {
  lostDocumentRequest,
  getDocumentTypes,
  fetchDistributors,
};

export default connect(mapStateToProps, mapStateToDispatch)(DocumentRequest);
