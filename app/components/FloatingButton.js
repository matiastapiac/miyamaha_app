import React, {useRef, useState} from 'react';
import {View, Image, Animated, StyleSheet, Pressable, Text} from 'react-native';
import {images} from '../common/images';
import {heightPercentageToDP as hp} from '../common/dimensions';
import {FONTS} from '../common/fonts';

const FloatingActionButton = ({onRightPress, onLeftPress}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const folderAnimation = useRef(new Animated.Value(0)).current;
  const fileAnimation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.parallel([
      Animated.timing(folderAnimation, {
        toValue,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(fileAnimation, {
        toValue,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
    setIsExpanded(!isExpanded);
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

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <Animated.View style={[styles.actionButton, folderStyle]}>
          <Pressable onPress={onLeftPress}>
            <Image source={images.folder} style={styles.imageIcon} />
          </Pressable>
          {isExpanded == 1 && (
            <Text style={styles.btnTitle}>Crear carpeta</Text>
          )}
        </Animated.View>
        <Animated.View style={[styles.actionButton, fileStyle]}>
          <Pressable onPress={onRightPress}>
            <Image source={images.file} style={styles.imageIcon} />
          </Pressable>
          {isExpanded == 1 && (
            <Text style={styles.btnTitle}>Subir archivo</Text>
          )}
        </Animated.View>
      </View>
      <Pressable onPress={toggleMenu} style={styles.mainButton}>
        <Animated.Image
          source={isExpanded ? images.close : images.plus}
          style={styles.mainIcon}
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
