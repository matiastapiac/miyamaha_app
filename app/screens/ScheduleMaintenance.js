import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {gstyles} from '../common/gstyles';
import {devices} from '../common/utils';
import ItemCard from '../components/ItemCard';
import Container from '../components/Container';
import AuthButton from '../components/AuthButton';
import {colors} from '../common/colors';

export default class ScheduleMaintenance extends Component {
  handleCancel = () => {
    this.props.navigation.pop();
  };
  renderItem = ({item, index}) => (
    <ItemCard icon={item.icon} title={item.title} subTitle={item.subTitle} />
  );
  render() {
    return (
      <Container>
        <View style={gstyles.itemConatiner}>
          <FlatList
            data={devices}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            contentContainerStyle={gstyles.itemContent}
          />
        </View>
        <AuthButton
          title={'Volver'}
          style={[
            gstyles.bottomBtn,
            {backgroundColor: colors.black, width: '95%'},
          ]}
          onPress={this.handleCancel}
        />
      </Container>
    );
  }
}
