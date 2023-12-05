import React, {useRef, useState} from 'react';
import {View, Image, Animated, StyleSheet, Pressable, Text} from 'react-native';
import {images} from '../common/images';
import {heightPercentageToDP as hp} from '../common/dimensions';
import {FONTS} from '../common/fonts';
import {strings as str} from '../common/strings';

const FloatingActionButton = ({onRightPress, onLeftPress}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const folderAnimation = useRef(new Animated.Value(0)).current;
  const fileAnimation = useRef(new Animated.Value(0)).current;
  const mainButtonRotation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;
    const duration = 500;

    setIsExpanded(!isExpanded);

    Animated.parallel([
      Animated.timing(folderAnimation, {
        toValue,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(fileAnimation, {
        toValue,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(mainButtonRotation, {
        toValue: isExpanded ? 0 : 0.5,
        duration,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const folderStyle = {
    transform: [
      {
        translateX: folderAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [40, -40],
        }),
      },
    ],
  };

  const fileStyle = {
    transform: [
      {
        translateX: fileAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-40, 40],
        }),
      },
    ],
  };

  const mainButtonRotationStyle = {
    transform: [
      {
        rotate: mainButtonRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <Animated.View style={[styles.actionButton, folderStyle]}>
          <Pressable onPress={onLeftPress}>
            <Image source={images.folder} style={styles.imageIcon} />
          </Pressable>
          {isExpanded && (
            <Text style={styles.btnTitle}>{str.createfolder}</Text>
          )}
        </Animated.View>
        <Animated.View style={[styles.actionButton, fileStyle]}>
          <Pressable onPress={onRightPress}>
            <Image source={images.file} style={styles.imageIcon} />
          </Pressable>
          {isExpanded && <Text style={styles.btnTitle}>{str.uploadFile}</Text>}
        </Animated.View>
      </View>
      <Pressable onPress={toggleMenu} style={styles.mainButton}>
        <Animated.Image
          source={isExpanded ? images.close : images.plus}
          style={[styles.mainIcon, mainButtonRotationStyle]}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnTitle: {
    fontFamily: FONTS.OpenSansMedium,
    fontSize: hp(1.5),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: -60,
  },
  actionButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  imageIcon: {
    width: hp(3),
    height: hp(3),
    resizeMode: 'contain',
  },
  mainButton: {
    borderRadius: 25,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainIcon: {
    width: hp(8),
    height: hp(8),
    resizeMode: 'contain',
  },
});

export default FloatingActionButton;
