import React, {Component} from 'react';
import {View, FlatList, Linking} from 'react-native';
import {connect} from 'react-redux';
import {guarantees, screen} from '../common/utils';
import {gstyles} from '../common/gstyles';
import {getWarrantyManual} from '../store/actions/maintenanceActions';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import ItemCard from '../components/ItemCard';

class Guarantees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    this.props.getWarrantyManual();
  }

  componentDidUpdate(prevProps) {
    const {warrantyManual} = this.props;
    if (
      warrantyManual &&
      warrantyManual.status === 'success' &&
      warrantyManual !== prevProps.warrantyManual
    ) {
      this.setState({data: warrantyManual.data.url});
    }
  }

  renderItem = ({item, index}) => (
    <ItemCard
      icon={item.icon}
      title={item.name}
      subTitle={item.description}
      onPress={() =>
        index == 1
          ? this.props.navigation.push(screen.SalesForm)
          : Linking.openURL(this.state.data)
      }
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

const mapStateToProps = state => ({
  loading: state?.maintenance?.loading,
  error: state?.maintenance?.error,
  warrantyManual: state?.maintenance?.warrantyManual,
});

const mapStateToDispatch = {
  getWarrantyManual,
};

export default connect(mapStateToProps, mapStateToDispatch)(Guarantees);
