import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
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
      data: [
        {
          photoUrl:
            'https://miyamaha.s3.us-east-2.amazonaws.com/generics/avatar-moto.png',
          userManualUrl:
            'https://mi-yamaha.s3.amazonaws.com/12345678-9/JYARJ251000000000/2021-01-01-00-00-00/12345678-9-JYARJ251000000000-2021-01-01-00-00-00.pdf',
          maintenanceManualUrl:
            'https://mi-yamaha.s3.amazonaws.com/12345678-9/JYARJ251000000000/2021-01-01-00-00-00/12345678-9-JYARJ251000000000-2021-01-01-00-00-00.pdf',
          vin: 'JYARJ251000000000',
          engineNumber: 'H402E-0093745',
          parentModelCode: 'YZF-R3',
          year: 2021,
          color: 'Azul',
          licensePlate: 'AB1234',
          createdAt: '2021-01-01T00:00:00',
          updatedAt: '2021-01-01T00:00:00',
          maintenance: [
            {
              id: 1,
              motorcycleVin: 'JYARJ251000000000',
              maintenanceType: '3000 KM',
              maintenanceDate: '2021-01-01T00:00:00',
              distributorName: 'Yamaha',
              distritutorAddress: 'Av. Apoquindo 1234',
              createdAt: '2021-01-01T00:00:00',
              updatedAt: '2021-01-01T00:00:00',
            },
          ],
        },
        {
          photoUrl:
            'https://miyamaha.s3.us-east-2.amazonaws.com/generics/avatar-moto.png',
          userManualUrl:
            'https://mi-yamaha.s3.amazonaws.com/12345678-9/JYARJ251000000000/2021-01-01-00-00-00/12345678-9-JYARJ251000000000-2021-01-01-00-00-00.pdf',
          maintenanceManualUrl:
            'https://mi-yamaha.s3.amazonaws.com/12345678-9/JYARJ251000000000/2021-01-01-00-00-00/12345678-9-JYARJ251000000000-2021-01-01-00-00-00.pdf',
          vin: 'JYARJ251000000000',
          engineNumber: 'H402E-0093745',
          parentModelCode: 'YZF-R44',
          year: 2021,
          color: 'Azul',
          licensePlate: 'AB1234',
          createdAt: '2021-01-01T00:00:00',
          updatedAt: '2021-01-01T00:00:00',
          maintenance: [
            {
              id: 1,
              motorcycleVin: 'JYARJ251000000000',
              maintenanceType: '200 KM',
              maintenanceDate: '2021-01-01T00:00:00',
              distributorName: 'Yamaha',
              distritutorAddress: 'Av. Apoquindo 1234',
              createdAt: '2021-01-01T00:00:00',
              updatedAt: '2021-01-01T00:00:00',
            },
          ],
        },
      ],
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
      // this.setState({data: [...this.state.data, ...data]});
      this.setState({data});
    }
  }

  handleSchedule = () => {
    this.props.navigation.push(screen.ScheduleMaintenance);
  };

  handleDownloadCerti = () => {
    const {data, activeSlide} = this.state;
    this.props.getMaintenanceCertificate(data[activeSlide].vin);
  };

  render() {
    const {activeSlide, data} = this.state;
    const {loading} = this.props;
    return (
      <Container>
        <TopHeader />
        <VehicleCarousel
          data={data}
          activeSlide={activeSlide}
          onSnapToItem={index => this.setState({activeSlide: index})}
        />

        {data.length > 0 && (
          <FlatList
            data={data[activeSlide].maintenance}
            keyExtractor={item => item}
            renderItem={({item, index}) => (
              <ScheduleCard
                key={index}
                km={item.maintenanceType}
                name={item.distributorName}
                address={item.distritutorAddress}
                date={item.createdAt}
              />
            )}
            contentContainerStyle={{marginHorizontal: 10}}
            showsVerticalScrollIndicator={false}
          />
        )}
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
