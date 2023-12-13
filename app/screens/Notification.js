import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {gstyles} from '../common/gstyles';
import {notifications} from '../common/utils';
import {strings as str} from '../common/strings';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import ItemCard from '../components/ItemCard';
import AuthButton from '../components/AuthButton';
import Alert from '../components/Alert';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      isVisible: false,
      data: {},
    };
  }

  handleSelection = i => {
    this.setState({selected: i});
  };

  handleItemPress = item => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible,
      data: prevState.isVisible ? {} : item,
    }));
  };

  renderItem = ({item}) => (
    <ItemCard
      title={item.title}
      subTitle={item.description}
      selected={this.state.selected == item.id}
      onRadioPress={() => this.handleSelection(item.id)}
      leftLabel={item.date}
      onPress={() => this.handleItemPress(item)}
    />
  );

  render() {
    const {isVisible, data} = this.state;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.notifications} />
        <View style={gstyles.listContainer}>
          <FlatList
            data={notifications}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <AuthButton
          title={str.eliminate}
          style={[
            gstyles.bottomBtn,
            {opacity: this.state.selected == 0 ? 0.6 : 1},
          ]}
          disabled={this.state.selected == 0}
        />
        <Alert
          visible={isVisible}
          isInfo
          btnTitle={str.close}
          title={data.title}
          subTitle={data.description}
          rightLabel={data.date}
          onSubmit={this.handleItemPress}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.loading,
  error: state?.error,
});

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(Notification);
