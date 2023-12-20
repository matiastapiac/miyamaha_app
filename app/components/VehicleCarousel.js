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
        itemWidth={screenWidth - 90}
        hasParallaxImages={true}
        onSnapToItem={onSnapToItem}
        layout={'default'}
      />
      <Text
        style={{
          textAlign: 'center',
          marginTop: -80,
          marginBottom: data.length > 0 ? 0 : -25,
          color: colors.red,
          fontFamily: FONTS.FjallaOneRegular,
          fontSize: 30,
        }}>
        {data[activeSlide]?.parentModelCode}
      </Text>
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 100,
          backgroundColor: colors.red,
        }}
        inactiveDotStyle={{
          width: 20,
          height: 20,
          borderRadius: 100,
          borderColor: colors.red,
          borderWidth: 2,
          backgroundColor: colors.white,
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />

      <Text
        style={{
          textAlign: 'center',
          marginTop: data.length > 0 ? 30 : -20,
          color: colors.grey,
          fontFamily: FONTS.OpenSansBold,
        }}>
        {moment(data[activeSlide]?.createdAt).format('DD MMM YYYY')}
      </Text>
      <View
        style={{
          width: '20%',
          alignSelf: 'center',
          marginVertical: 5,
          borderBottomWidth: 2,
          borderBottomColor: colors.red,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          color: colors.grey,
          fontFamily: FONTS.OpenSansRegular,
        }}>
        {str.lastMaintenance}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 40,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
