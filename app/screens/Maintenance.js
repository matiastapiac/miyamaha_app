import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {screen, vehicles} from '../common/utils';
import {colors} from '../common/colors';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import AuthButton from '../components/AuthButton';
import ScheduleCard from '../components/ScheduleCard';
import VehicleCarousel from '../components/VehicleCarousel';

export default class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }
  handleSchedule = () => {
    this.props.navigation.push(screen.ScheduleMaintenance);
  };

  render() {
    const {activeSlide} = this.state;
    return (
      <Container>
        <TopHeader />
        <VehicleCarousel
          data={vehicles}
          activeSlide={activeSlide}
          onSnapToItem={index => this.setState({activeSlide: index})}
        />
        <FlatList
          data={vehicles[activeSlide].maintenance}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ScheduleCard
              km={item.distance}
              name={item.dealer}
              address={item.address}
              date={item.date}
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
            title={'Agendar mantención'}
            onPress={this.handleSchedule}
            style={{width: '48%'}}
          />
          <AuthButton
            title={'Descargar certificado'}
            style={{width: '48%', backgroundColor: colors.black}}
          />
        </View>
      </Container>
    );
  }
}
