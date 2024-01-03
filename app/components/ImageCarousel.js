import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Pressable,
  Linking,
} from 'react-native';
import {colors} from '../common/colors';

const {width} = Dimensions.get('window');

const ImageCarousel = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const nextIndex = (currentIndex + 1) % images.length;
  //     setCurrentIndex(nextIndex);
  //     scrollToIndex(nextIndex);
  //   }, 3000); // Change the interval duration as needed (in milliseconds)

  //   return () => clearInterval(interval);
  // }, [currentIndex, images]);

  const scrollToIndex = index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: true, index});
    }
  };

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {
      useNativeDriver: false,
    },
  );

  const onIndexChanged = index => {
    setCurrentIndex(index);
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => Linking.openURL(item.targetUrl)}
        style={{
          width,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Image
          source={{uri: item.imageUrl}}
          style={{
            width: '95%',
            height: '90%',
            resizeMode: 'stretch',
            borderRadius: 10,
          }}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          onIndexChanged(index);
        }}
      />
      <View style={styles.dotContainer}>
        {images &&
          images.map((_, index) => {
            const backgroundColor =
              index === currentIndex ? colors.red : colors.white;

            return (
              <View
                key={index.toString()}
                style={[styles.dot, {backgroundColor}]}
              />
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.red,
    marginHorizontal: 5,
  },
});

export default ImageCarousel;
