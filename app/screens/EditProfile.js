import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {gstyles} from '../common/gstyles';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';

export default class EditProfile extends Component {
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
    };
  }

  componentDidMount() {
    this.setUserData();
  }

  setUserData() {
    const {user} = this.props?.route?.params;
    console.log(user);
    this.setState({
      name: user.name,
      surname: user.surname,
      dob: user.dob,
      email: user.email,
      phone: user.phone,
      address: user.address,
      common: user.common,
      region: user.region,
    });
  }

  handleChangeText = (label, text) => {
    switch (label) {
      case 'Nombre':
        this.setState({name: text});
        break;
      case 'Apellidos':
        this.setState({surname: text});
        break;
      case 'Fecha nacimiento':
        this.setState({dob: text});
        break;
      case 'Email':
        this.setState({email: text});
        break;
      case 'Teléfono':
        this.setState({phone: text});
        break;
      case 'Dirección':
        this.setState({address: text});
        break;
      case 'Comuna':
        this.setState({common: text});
        break;
      case 'Región':
        this.setState({region: text});
        break;
      default:
        break;
    }
  };

  render() {
    const {name, surname, dob, email, phone, address, common, region} =
      this.state;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={'EDITAR PERFIL'} />
        <View style={gstyles.listContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthInput
              label={'Nombre'}
              value={name}
              onChangeText={text => this.handleChangeText('Nombre', text)}
            />
            <AuthInput
              label={'Apellidos'}
              value={surname}
              onChangeText={text => this.handleChangeText('Apellidos', text)}
            />
            <AuthInput
              label={'Fecha nacimiento'}
              value={dob}
              onChangeText={text =>
                this.handleChangeText('Fecha nacimiento', text)
              }
            />
            <AuthInput
              label={'Email'}
              value={email}
              onChangeText={text => this.handleChangeText('Email', text)}
            />
            <AuthInput
              label={'Teléfono'}
              value={phone}
              onChangeText={text => this.handleChangeText('Teléfono', text)}
            />
            <AuthInput
              label={'Dirección'}
              value={address}
              onChangeText={text => this.handleChangeText('Dirección', text)}
            />
            <AuthInput
              label={'Comuna'}
              value={common}
              onChangeText={text => this.handleChangeText('Comuna', text)}
            />
            <AuthInput
              label={'Región'}
              value={region}
              onChangeText={text => this.handleChangeText('Región', text)}
            />
          </ScrollView>
        </View>
        <AuthButton title={'Guardar'} style={gstyles.bottomBtn} />
      </Container>
    );
  }
}
