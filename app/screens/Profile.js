import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {gstyles} from '../common/gstyles';
import {images} from '../common/images';
import {screen} from '../common/utils';
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
        <TopHeader label={'PERFIL DE USUARIO'} />
        <View style={gstyles.listContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthInput label={'Nombre'} value={user.name} editable={false} />
            <AuthInput
              label={'Apellidos'}
              value={user.surname}
              editable={false}
            />
            <AuthInput
              label={'Fecha nacimiento'}
              value={user.dob}
              editable={false}
            />
            <AuthInput label={'Email'} value={user.email} editable={false} />
            <AuthInput label={'Teléfono'} value={user.phone} editable={false} />
            <AuthInput
              label={'Dirección'}
              value={user.address}
              editable={false}
            />
            <AuthInput label={'Comuna'} value={user.common} editable={false} />
            <AuthInput label={'Región'} value={user.region} editable={false} />
            {user.vehicles.length > 0 && (
              <>
                <Text style={gstyles.fjallaText}>VEHÍCULOS REGISTRADOS</Text>
                {user.vehicles.map(vehicle => (
                  <ItemCard
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
          title={'Editar perfil'}
          style={gstyles.bottomBtn}
          onPress={this.handleEditProfile}
        />
      </Container>
    );
  }
}
