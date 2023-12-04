import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {images} from '../common/images';

export default function Validation({onPress, status}) {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={status ? images.vRed : images.vGrey}
        style={styles.round}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  round: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
    right: 0,
    position: 'absolute',
  },
});
