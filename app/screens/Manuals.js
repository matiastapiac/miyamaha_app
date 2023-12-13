import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {manuals} from '../common/utils';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import ItemCard from '../components/ItemCard';
import AuthButton from '../components/AuthButton';

class Manuals extends Component {
  renderItem = ({item, index}) => (
    <ItemCard icon={item.icon} title={item.title} subTitle={item.description} />
  );

  render() {
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.manuals} />
        <View style={{paddingTop: 20}}>
          <FlatList
            data={manuals}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <AuthButton title={str.return} style={gstyles.bottomBtn} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.loading,
  error: state?.error,
});

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(Manuals);
