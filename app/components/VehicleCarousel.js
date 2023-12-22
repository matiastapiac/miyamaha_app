import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import moment from 'moment';
import {FONTS} from '../common/fonts';
import {colors} from '../common/colors';
import {strings as str} from '../common/strings';

const {width: screenWidth} = Dimensions.get('window');

export default function VehicleCarousel({data, activeSlide, onSnapToItem}) {
  const _renderItem = ({item}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.photoUrl}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
      </View>
    );
  };
  return (
    <View>
      <Carousel
        data={data}
        renderItem={_renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 70}
        hasParallaxImages={true}
        onSnapToItem={onSnapToItem}
        layout={'default'}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.titleTxt}>
          {data[activeSlide]?.parentModelCode}
        </Text>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={{paddingVertical: 5}}
          dotStyle={styles.dot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.6}
        />
        <Text style={styles.dateTxt}>
          {data[activeSlide]?.createdAt &&
            moment(data[activeSlide]?.createdAt).format('DD MMM YYYY')}
        </Text>
        <View style={styles.border} />
        <Text style={styles.bottomTxt}>{str.lastMaintenance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    marginTop: -60,
    marginBottom: 10,
  },
  inactiveDot: {
    width: 15,
    height: 15,
    borderRadius: 100,
    borderColor: colors.red,
    borderWidth: 2,
    backgroundColor: colors.white,
    marginHorizontal: -5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: colors.red,
    marginHorizontal: -5,
  },
  bottomTxt: {
    textAlign: 'center',
    color: colors.grey,
    fontFamily: FONTS.OpenSansRegular,
  },
  border: {
    width: '20%',
    alignSelf: 'center',
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: colors.red,
  },
  titleTxt: {
    textAlign: 'center',
    color: colors.red,
    fontFamily: FONTS.FjallaOneRegular,
    fontSize: 30,
  },
  dateTxt: {
    textAlign: 'center',
    color: colors.grey,
    fontFamily: FONTS.OpenSansBold,
  },
  item: {
    width: screenWidth - 40,
    height: screenWidth - 110,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
