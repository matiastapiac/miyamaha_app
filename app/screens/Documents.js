import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {gstyles} from '../common/gstyles';
import {documents, screen} from '../common/utils';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import ItemCard from '../components/ItemCard';

class Documents extends Component {
  handleEvent(index) {
    index == 0
      ? this.props.navigation.push(screen.MyDocuments)
      : index == 1
      ? this.props.navigation.push(screen.DocumentRequest)
      : this.props.navigation.push(screen.Manuals);
  }

  renderItem = ({item, index}) => (
    <ItemCard
      icon={item.icon}
      title={item.name}
      subTitle={item.description}
      onPress={() => this.handleEvent(index)}
    />
  );

  render() {
    return (
      <Container>
        <TopHeader />
        <View style={gstyles.itemConatiner}>
          <FlatList
            data={documents}
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

const mapStateToProps = state => ({
  loading: state?.loading,
  error: state?.error,
});

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(Documents);
