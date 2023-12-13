import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {gstyles} from '../common/gstyles';
import {data} from '../common/utils';
import {strings as str} from '../common/strings';
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
        <AuthButton title={str.send} style={gstyles.bottomBtn} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.loading,
  error: state?.error,
});

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(DocumentRequest);
