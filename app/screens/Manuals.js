import React, {Component} from 'react';
import {FlatList, Linking, View} from 'react-native';
import {connect} from 'react-redux';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
import {fetchProfile} from '../store/actions/authActions';
import {images} from '../common/images';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import ItemCard from '../components/ItemCard';
import AuthButton from '../components/AuthButton';

class Manuals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  componentDidUpdate(prevProps) {
    const {profile} = this.props;

    if (
      profile &&
      profile.status === 'success' &&
      profile !== prevProps.profile
    ) {
      const data = profile.data.motorcycles;
      this.setState({data});
    }
  }

  handleReturn = () => {
    this.props.navigation.pop();
  };

  handleLinking = url => {
    Linking.openURL(url);
  };

  renderItem = ({item}) => (
    <>
      <ItemCard
        icon={images.book}
        title={`${item.parentModelCode} ${str.maintenanceManual}`}
        onPress={() => this.handleLinking(item.maintenanceManualUrl)}
        subTitle={str.maintenanceManualDesc}
      />
      <ItemCard
        icon={images.book}
        title={`${item.parentModelCode} ${str.userManual}`}
        onPress={() => this.handleLinking(item.userManualUrl)}
        subTitle={str.userManualDesc}
      />
    </>
  );

  render() {
    const {data} = this.state;
    return (
      <Container style={{paddingHorizontal: 10}}>
        <TopHeader label={str.manuals} />
        <View style={{paddingTop: 20}}>
          <FlatList
            data={data}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <AuthButton
          title={str.return}
          style={gstyles.bottomBtn}
          onPress={this.handleReturn}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {loading, error, profile} = state.auth;

  return {
    loading,
    error,
    profile,
  };
};

const mapStateToDispatch = {
  fetchProfile,
};

export default connect(mapStateToProps, mapStateToDispatch)(Manuals);
