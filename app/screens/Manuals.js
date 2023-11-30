import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {manuals} from '../common/utils';
import {gstyles} from '../common/gstyles';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import ItemCard from '../components/ItemCard';
import AuthButton from '../components/AuthButton';

export default class Manuals extends Component {
  renderItem = ({item, index}) => (
    <ItemCard icon={item.icon} title={item.title} subTitle={item.description} />
  );

  render() {
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={'MANUALES'} />
        <View style={{paddingTop: 20}}>
          <FlatList
            data={manuals}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <AuthButton title={'Volver'} style={gstyles.bottomBtn} />
      </Container>
    );
  }
}
