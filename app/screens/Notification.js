import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {gstyles} from '../common/gstyles';
import {notifications} from '../common/utils';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import ItemCard from '../components/ItemCard';
import AuthButton from '../components/AuthButton';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }

  handleSelection = i => {
    this.setState({selected: i});
  };

  renderItem = ({item}) => (
    <ItemCard
      title={item.title}
      subTitle={item.description}
      selected={this.state.selected == item.id}
      onRadioPress={() => this.handleSelection(item.id)}
      leftLabel={item.date}
    />
  );

  render() {
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={'NOTIFICACIONES'} />
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={gstyles.notifContent}
        />
        <AuthButton
          title={'Eliminar'}
          style={[gstyles.bottomBtn, {opacity: this.state.selected == 0 && 0.6}]}
          disabled={this.state.selected == 0}
        />
      </Container>
    );
  }
}
