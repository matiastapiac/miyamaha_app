import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import {bikes} from '../common/utils';

const {width: screenWidth} = Dimensions.get('window');

function scrollInterpolator2(index, carouselProps) {
  const range = [2, 1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return {inputRange, outputRange};
}
function animatedStyles2(index, animatedValue, carouselProps) {
  const sizeRef = carouselProps.vertical
    ? carouselProps.itemHeight
    : carouselProps.itemWidth;
  const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

  return {
    zIndex: carouselProps.data.length - index,
    opacity: animatedValue.interpolate({
      inputRange: [-1, 0, 1, 2],
      outputRange: [0.75, 1, 0.6, 0.4],
    }),
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2],
          outputRange: ['0deg', '0deg', '5deg', '8deg'],
          extrapolate: 'clamp',
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2],
          outputRange: [0.96, 1, 0.85, 0.7],
        }),
      },
      {
        [translateProp]: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2],
          outputRange: [0, 0, -sizeRef + 30, -sizeRef * 2 + 45],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
}

export default class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }

  _renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={item}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.12}
          {...parallaxProps}
        />
        {/* <Image source={item} style={{borderWidth:1, resizeMode:'contain', width:'80%'}}/> */}
      </View>
    );
  };

  get pagination() {
    return (
      <Pagination
        dotsLength={bikes.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <Container>
        <TopHeader />
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={bikes}
          renderItem={this._renderItem}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 40}
          hasParallaxImages={true}
          onSnapToItem={index => this.setState({activeSlide: index})}
          {...this.pagination}
          crollInterpolator={scrollInterpolator2}
          slideInterpolatedStyle={animatedStyles2}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 40,
    height: screenWidth - 40,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
