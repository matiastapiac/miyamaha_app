import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {images} from '../common/images';
import {
  heightPercentageToDP as wp,
  widthPercentageToDP as hp,
} from '../common/dimensions';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';

export default function TopHeader({label}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={images.leftarrow}
          style={styles.btn}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.btn}></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: hp(5),
    width: hp(5),
  },
  label: {
    color: colors.red,
    fontFamily: FONTS.FjallaOneRegular,
    fontSize: hp(4.5),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(15),
    borderBottomColor: colors.border,
    borderBottomWidth: 2,
  },
});
