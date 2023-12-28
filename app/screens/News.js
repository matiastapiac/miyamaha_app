import React, {Component} from 'react';
import {View, ScrollView, Image, LogBox, Pressable} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {colors} from '../common/colors';
import Container from '../components/Container';
import {getNews} from '../store/actions/maintenanceActions';
import TopHeader from '../components/TopHeader';
import ImageCarousel from '../components/ImageCarousel';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselNews: [],
      galleryNews: [],
    };
  }

  componentDidMount() {
    LogBox.ignoreAllLogs();
    this.props.getNews();
  }

  componentDidUpdate(prevProps) {
    const {news} = this.props;

    if (news && news.status === 'success' && news !== prevProps.news) {
      const carouselNews = news.data.carouselNews;
      const galleryNews = news.data.galleryNews;
      this.setState({carouselNews, galleryNews});
    }
  }

  renderImages = () => {
    return this.state.galleryNews.map((item, index) => (
      <Pressable key={index} style={styles.imageWrapper}>
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
            <ImageCarousel images={carouselNews} />
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
    height: 150,
    width: '100%',
    borderRadius: 10,
  },
};
