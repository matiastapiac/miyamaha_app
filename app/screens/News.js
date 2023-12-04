import React, {Component} from 'react';
import {View, ScrollView, Image, TouchableOpacity, LogBox} from 'react-native';
import Container from '../components/Container';
import {curousel} from '../common/utils';
import {colors} from '../common/colors';
import {images} from '../common/images';
import TopHeader from '../components/TopHeader';
import ImageCarousel from '../components/ImageCarousel';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [images.img4, images.img5, images.img4, images.img5],
    };
  }

  componentDidMount() {
    LogBox.ignoreAllLogs();
  }

  renderImages = () => {
    return this.state.data.map((item, index) => (
      <TouchableOpacity key={index} style={styles.imageWrapper}>
        <Image source={item} style={styles.image} />
      </TouchableOpacity>
    ));
  };

  render() {
    return (
      <Container>
        <TopHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.carouselContainer}>
            <ImageCarousel images={curousel} />
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
      </Container>
    );
  }
}

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
