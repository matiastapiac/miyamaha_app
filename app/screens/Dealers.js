import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {screen} from '../common/utils';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
import {fetchDistributors} from '../store/actions/ditributorsActions';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import PickerInput from '../components/PickerInput';
import AuthButton from '../components/AuthButton';

class Dealers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmited: false,
      region: '',
      city: '',
      cities: [],
      regions: [],
      data: [],
    };
  }

  componentDidMount() {
    this.props.fetchDistributors();
  }

  componentDidUpdate(prevProps) {
    const {distributors} = this.props;

    if (
      distributors &&
      distributors.status === 'success' &&
      distributors !== prevProps.distributors
    ) {
      const regions = distributors.data.map(item => item.region);
      this.setState({
        data: distributors.data,
        regions: Array.from(new Set(regions)).sort(),
      });
    }
  }

  setRegion = e => {
    this.setState({region: e, city: '', cityKey: Math.random()});
    const {data} = this.state;
    const filteredCitiesSet = new Set(
      data.filter(item => item.region === e).map(item => item.city),
    );
    const cities = Array.from(filteredCitiesSet).sort();
    this.setState({cities});
  };
  setCity = e => {
    this.setState({city: e});
  };
  setCommon = e => {
    this.setState({common: e});
  };

  handleSubmit = () => {
    const {city, region} = this.state;
    this.props.navigation.push(screen.SerachDealers, {city, region});
  };

  render() {
    const {region, city, regions, cities, cityKey} = this.state;
    return (
      <Container>
        <TopHeader />
        <View style={[gstyles.itemConatiner, gstyles.notifContent]}>
          <Text style={gstyles.dealersTitle}>{str.selectLocation}</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}>
            <PickerInput
              label={str.region}
              placeholder={str.selectRegion}
              data={regions}
              setSelected={this.setRegion}
            />
            <PickerInput
              key={cityKey}
              label={str.city}
              placeholder={str.selectCity}
              data={cities}
              setSelected={this.setCity}
            />
          </ScrollView>
          <AuthButton
            title={str.following}
            style={gstyles.bottomBtn}
            disabled={!region || !city}
            onPress={this.handleSubmit}
          />
        </View>
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

export default connect(mapStateToProps, mapStateToDispatch)(Dealers);
