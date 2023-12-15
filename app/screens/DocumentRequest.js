import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {gstyles} from '../common/gstyles';
import {data} from '../common/utils';
import {strings as str} from '../common/strings';
import {lostDocumentRequest} from '../store/actions/documentActions';
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
      distributor: '',
    };
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
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.docRequest} />
        <ScrollView>
          <PickerInput
            label={str.selectTypeOfDoc}
            placeholder={str.selectTypeOfDoc}
            data={data}
            setSelected={this.setDocType}
          />
          <PickerInput
            label={str.selectADistributor}
            placeholder={str.selectTheDistributor}
            data={data}
            setSelected={this.setDistributor}
          />
        </ScrollView>
        <AuthButton
          title={str.send}
          style={gstyles.bottomBtn}
          onPress={this.handleRequestDocument}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.document?.loading,
  error: state?.document?.error,
  lost: state?.document?.lost,
});

const mapStateToDispatch = {
  lostDocumentRequest,
};

export default connect(mapStateToProps, mapStateToDispatch)(DocumentRequest);
