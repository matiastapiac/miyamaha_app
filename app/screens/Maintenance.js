import React, {Component} from 'react';
import {View, FlatList, PermissionsAndroid} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {screen} from '../common/utils';
import {colors} from '../common/colors';
import {strings as str} from '../common/strings';
import {fetchProfile} from '../store/actions/authActions';
import {getMaintenanceCertificate} from '../store/actions/maintenanceActions';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthButton from '../components/AuthButton';
import ScheduleCard from '../components/ScheduleCard';
import VehicleCarousel from '../components/VehicleCarousel';

class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  componentDidUpdate(prevProps) {
    const {profile} = this.props;
    if (
      profile &&
      profile.status === 'success' &&
      profile !== prevProps.profile
    ) {
      const data = profile.data.motorcycles;
      this.setState({data});
    }
  }

  handleSchedule = () => {
    this.props.navigation.push(screen.ScheduleMaintenance);
  };

  handleDownloadCerti = async () => {
    const {data, activeSlide} = this.state;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      this.props.getMaintenanceCertificate(data[activeSlide].vin);
    } else {
    }
  };

  render() {
    const {activeSlide, data} = this.state;
    const {loading} = this.props;
    ''
    return (
      <Container>
        <TopHeader />
        <VehicleCarousel
          data={data}
          activeSlide={activeSlide}
          onSnapToItem={index => this.setState({activeSlide: index})}
        />

        <FlatList
          data={data[activeSlide]?.maintenances}
          keyExtractor={item => item}
          renderItem={({item, index}) => (
            <ScheduleCard
              key={index}
              km={item.maintenanceType}
              name={item.distributorName}
              address={item.distributorAddress}
              date={item.createdAt}
            />
          )}
          contentContainerStyle={{marginHorizontal: 10}}
          showsVerticalScrollIndicator={false}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <AuthButton
            title={str.scheduleMaintance}
            onPress={this.handleSchedule}
            style={{width: '48%'}}
            textStyle={{fontSize: 12}}
          />
          <AuthButton
            title={str.downloadCertificare}
            onPress={this.handleDownloadCerti}
            style={{width: '48%', backgroundColor: colors.black}}
            textStyle={{fontSize: 12}}
          />
        </View>
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {loading, error, profile} = state.auth;
  const {certificate} = state.maintenance;

  return {
    loading,
    error,
    profile,
    certificate,
  };
};

const mapStateToDispatch = {
  fetchProfile,
  getMaintenanceCertificate,
};

export default connect(mapStateToProps, mapStateToDispatch)(Maintenance);
