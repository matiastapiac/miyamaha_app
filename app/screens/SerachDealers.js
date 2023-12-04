import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {gstyles} from '../common/gstyles';
import {dealers} from '../common/utils';
import {strings as str} from '../common/strings';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import SearchCard from '../components/SearchCard';
import AuthButton from '../components/AuthButton';

export default class SerachDealers extends Component {
  renderItem = ({item}) => (
    <SearchCard
      title={item.name}
      address={item.address}
      time={item.time}
      phone={item.phone}
      email={item.email}
    />
  );

  handleSubmit = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.searchResults} />
        <View style={gstyles.listContainer}>
          <FlatList
            data={dealers}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <AuthButton
          title={str.return}
          style={gstyles.bottomBtn}
          onPress={this.handleSubmit}
        />
      </Container>
    );
  }
}
