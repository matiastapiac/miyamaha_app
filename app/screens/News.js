import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  LogBox,
  Pressable,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../common/colors';
import {getNews} from '../store/actions/maintenanceActions';
import {screen} from '../common/utils';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import ImageCarousel from '../components/ImageCarousel';
import store from '../store';
import ts from '../common/translate';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselNews: [],
      galleryNews: [],
      logoutHandled: false,
    };
  }

  componentDidMount() {
    LogBox.ignoreAllLogs();
    AsyncStorage.getItem('authToken').then(token => {
      if (!token) {
        this.props.navigation.reset({
          index: 0,
          routes: [{name: screen.Login}],
        });
        return;
      }
      this.props.getNews();
    });
    Linking.addEventListener('url', this.handleDeepLink);
  }

  componentDidUpdate(prevProps) {
    const {news} = this.props;

    if (news && news.status === 'success' && news !== prevProps.news) {
      const carouselNews = news.data.carouselNews;
      const galleryNews = news.data.galleryNews;
      this.setState({carouselNews, galleryNews});
    }
  }

  componentWillUnmount() {
    Linking.removeAllListeners(this.handleDeepLink);
  }

  handleDeepLink = ({url}) => {
    const {logoutHandled} = this.state;
    if (logoutHandled) {
      return;
    }
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('/')[0];

    if (routeName === screen.Notification) {
      this.props.navigation.push(screen.Notification);
    } else if (routeName == screen.Login) {
      this.handleLogoutAct();
      this.setState({logoutHandled: true});
    }
  };

  handleLogoutAct = async () => {
    await AsyncStorage.removeItem('authToken');
    store.dispatch({
      type: 'REMOVE_AUTH_TOKEN',
      payload: null,
    });
    this.props.navigation.push(screen.Login);
    ts('Your session is expired', 'warning');
  };

  renderImages = () => {
    return this.state.galleryNews.map((item, index) => (
      <Pressable
        key={index}
        style={styles.imageWrapper}
        onPress={() => Linking.openURL(item.targetUrl)}>
        <Image source={{uri: item.imageUrl}} style={styles.image} />
      </Pressable>
    ));
  };

  render() {
    const {carouselNews} = this.state;
    const {loading} = this.props;
    return (
      <Container>
        <TopHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.carouselContainer}>
            {carouselNews && carouselNews.length > 0 ? (
              <ImageCarousel images={carouselNews} />
            ) : null}
          </View>
          <View
            style={{
              ...styles.container,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {this.renderImages()}
          </View>
        </ScrollView>
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {loading, error, news} = state.maintenance;

  return {
    loading,
    error,
    news,
  };
};

const mapStateToDispatch = {
  getNews,
};

export default connect(mapStateToProps, mapStateToDispatch)(News);

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  carouselContainer: {
    height: 400,
    backgroundColor: colors.white,
  },
  imageWrapper: {
    width: '50%',
    padding: 10,
  },
  image: {
    //height: 150,
    aspectRatio: 1,
    width: '100%',
    borderRadius: 10,
  },
};
