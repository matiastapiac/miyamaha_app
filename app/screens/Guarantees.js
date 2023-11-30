import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {guarantees, screen} from '../common/utils';
import {gstyles} from '../common/gstyles';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import ItemCard from '../components/ItemCard';

export default class Guarantees extends Component {
  renderItem = ({item, index}) => (
    <ItemCard
      icon={item.icon}
      title={item.name}
      subTitle={item.description}
      onPress={() => index == 1 && this.props.navigation.push(screen.SalesForm)}
    />
  );

  render() {
    return (
      <Container>
        <TopHeader />
        <View style={gstyles.itemConatiner}>
          <FlatList
            data={guarantees}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            contentContainerStyle={gstyles.itemContent}
          />
        </View>
      </Container>
    );
  }
}
