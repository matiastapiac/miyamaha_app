import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {gstyles} from '../common/gstyles';
import {images} from '../common/images';
import {screen} from '../common/utils';
import {strings as str} from '../common/strings';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import ItemCard from '../components/ItemCard';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Juan Pablo',
        surname: 'Alvarado Lopez',
        dob: '30/12/1985',
        email: 'miemail@email.cl',
        phone: '+59 9999999',
        address: 'Los castaños 657 depto 78',
        common: 'Las Condes',
        region: 'Metropolitana',
        vehicles: [
          {name: 'R1 Super Sport', vin: '1235234 234897 234'},
          {name: 'Tracer 9 GT', vin: '1235234 234897 234'},
        ],
      },
    };
  }

  handleEditProfile = () => {
    this.props.navigation.push(screen.EditProfile, {user: this.state.user});
  };

  render() {
    const {user} = this.state;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.userProfile} />
        <View style={[gstyles.listContainer, {marginBottom: '40%'}]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthInput label={str.name} value={user.name} editable={false} />
            <AuthInput
              label={str.surname}
              value={user.surname}
              editable={false}
            />
            <AuthInput
              label={str.birthDate}
              value={user.dob}
              editable={false}
            />
            <AuthInput label={str.email} value={user.email} editable={false} />
            <AuthInput
              label={str.telephone}
              value={user.phone}
              editable={false}
            />
            <AuthInput
              label={str.address}
              value={user.address}
              editable={false}
            />
            <AuthInput
              label={str.commune}
              value={user.common}
              editable={false}
            />
            <AuthInput
              label={str.region}
              value={user.region}
              editable={false}
            />
            {user.vehicles.length > 0 && (
              <>
                <Text style={gstyles.fjallaText}>{str.registeredVehicles}</Text>
                {user.vehicles.map((vehicle, index) => (
                  <ItemCard
                    key={index}
                    title={vehicle.name}
                    subTitle={vehicle.vin}
                    icon={images.bike}
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
