import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {gstyles} from '../common/gstyles';
import {images} from '../common/images';
import {screen} from '../common/utils';
import {strings as str} from '../common/strings';
import {fetchProfile} from '../store/actions/authActions';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import ItemCard from '../components/ItemCard';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      dob: '',
      email: '',
      phone: '',
      address: '',
      common: '',
      region: '',
      vehicles: [],
    };
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  componentDidUpdate(prevProps) {
    const {profile} = this.props;
    if (
      profile?.status === 'success' &&
      prevProps.profile?.status !== 'success'
    ) {
      const {user, motorcycles} = profile?.data;
      this.setState({
        name: user?.firstName,
        surname: user?.lastName,
        dob: '',
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        common: user?.commune,
        region: user?.region,
        vehicles: motorcycles,
      });
    }
  }

  handleEditProfile = () => {
    this.props.navigation.push(screen.EditProfile);
  };

  render() {
    const {
      name,
      surname,
      dob,
      phone,
      address,
      common,
      email,
      region,
      vehicles,
    } = this.state;

    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.userProfile} />
        <View style={[gstyles.listContainer, {marginBottom: '40%'}]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthInput label={str.name} value={name} editable={false} />
            <AuthInput label={str.surname} value={surname} editable={false} />
            <AuthInput label={str.birthDate} value={dob} editable={false} />
            <AuthInput label={str.email} value={email} editable={false} />
            <AuthInput label={str.telephone} value={phone} editable={false} />
            <AuthInput label={str.address} value={address} editable={false} />
            <AuthInput label={str.commune} value={common} editable={false} />
            <AuthInput label={str.region} value={region} editable={false} />
            {vehicles.length > 0 && (
              <>
                <Text style={gstyles.fjallaText}>{str.registeredVehicles}</Text>
                {vehicles.map((vehicle, index) => (
                  <ItemCard
                    key={index}
                    title={vehicle.engineNumber}
                    subTitle={vehicle.vin}
                    icon={vehicle.photoUrl}
                    style={gstyles.vehicleContent}
                  />
                ))}
              </>
            )}
          </ScrollView>
        </View>
        <AuthButton
          title={str.editProfile}
          style={gstyles.bottomBtn}
          onPress={this.handleEditProfile}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.auth?.loading,
  error: state?.auth?.error,
  profile: state?.auth?.profile,
  authToken: state?.auth?.authToken,
});

const mapStateToDispatch = {
  fetchProfile,
};

export default connect(mapStateToProps, mapStateToDispatch)(Profile);
