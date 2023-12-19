import React, {Component} from 'react';
import {View, FlatList, Linking, Platform} from 'react-native';
import {connect} from 'react-redux';
import {gstyles} from '../common/gstyles';
import {devices} from '../common/utils';
import {colors} from '../common/colors';
import {strings as str} from '../common/strings';
import {getMaintenanceUrls} from '../store/actions/maintenanceActions';
import ItemCard from '../components/ItemCard';
import Container from '../components/Container';
import AuthButton from '../components/AuthButton';
import Spinner from 'react-native-loading-spinner-overlay';

class ScheduleMaintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.props.getMaintenanceUrls();
  }

  componentDidUpdate(prevProps) {
    const {urls} = this.props;
    if (urls && urls.status === 'success' && urls !== prevProps.urls) {
      this.setState({data: urls.data});
    }
  }

  handleEvent = index => {
    const {data} = this.state;
    let link = '';

    switch (index) {
      case 0:
        link = data.webMaintenanceTarget;
        break;
      case 1:
        link =
          Platform.OS === 'ios'
            ? `telprompt:${data.phoneMaintenanceTarget}`
            : `tel:${data.phoneMaintenanceTarget}`;
        break;
      case 2:
        link = `whatsapp://send?text=hello&phone=${data.whatsappMaintenanceTarget}`;
        break;
      default:
        break;
    }

    if (link) {
      Linking.openURL(link);
    }
  };

  handleCancel = () => {
    this.props.navigation.pop();
  };

  renderItem = ({item, index}) => (
    <ItemCard
      icon={item.icon}
      title={item.title}
      subTitle={item.subTitle}
      onPress={() => this.handleEvent(index)}
    />
  );

  render() {
    const {loading} = this.props;
    return (
      <Container>
        <View style={gstyles.itemConatiner}>
          <FlatList
            data={devices}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            contentContainerStyle={gstyles.itemContent}
          />
        </View>
        <AuthButton
          title={str.return}
          style={[
            gstyles.bottomBtn,
            {backgroundColor: colors.black, width: '95%'},
          ]}
          onPress={this.handleCancel}
        />
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {loading, error, urls} = state.maintenance;

  return {
    loading,
    error,
    urls,
  };
};

const mapStateToDispatch = {
  getMaintenanceUrls,
};

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(ScheduleMaintenance);
