import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
import {fetchDistributors} from '../store/actions/ditributorsActions';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import SearchCard from '../components/SearchCard';
import AuthButton from '../components/AuthButton';
import Spinner from 'react-native-loading-spinner-overlay';

class SerachDealers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.props.fetchDistributors();
  }

  componentDidUpdate(prevProps) {
    const {distributors} = this.props;
    const {city, region} = this.props.route.params;

    if (
      distributors &&
      distributors.status === 'success' &&
      distributors !== prevProps.distributors
    ) {
      const data = distributors.data.filter(
        item => item.city == city && item.region == region,
      );
      this.setState({data});
    }
  }

  renderItem = ({item}) => (
    <SearchCard
      title={item.name}
      address={`${item.address}, ${item.city}, ${item.region}`}
      time={item.businessHours}
      phone={item.phone}
      email={item.email}
    />
  );

  handleSubmit = () => {
    this.props.navigation.pop();
  };

  render() {
    const {loading} = this.props;
    const {data} = this.state;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.searchResults} />
        <View
          style={[
            gstyles.listContainer,
            {
              flex: 1,
              justifyContent: 'center',
            },
          ]}>
          {data.length === 0 ? (
            <Text style={gstyles.NoText}>Datos no disponibles</Text>
          ) : (
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
        <AuthButton
          title={str.return}
          style={gstyles.bottomBtn}
          onPress={this.handleSubmit}
        />
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {loading, error, distributors} = state.distributors;

  return {
    loading,
    error,
    distributors,
  };
};

const mapStateToDispatch = {
  fetchDistributors,
};

export default connect(mapStateToProps, mapStateToDispatch)(SerachDealers);
