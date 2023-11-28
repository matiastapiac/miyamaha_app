import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {
  heightPercentageToDP as wp,
  widthPercentageToDP as hp,
} from '../common/dimensions';

export default function TextButton({title, onPress, color, font, position}) {
  return (
    <TouchableOpacity style={{alignSelf: position, marginVertical:5}} onPress={onPress}>
      <Text
        style={{
          color: color ? color : colors.red,
          fontFamily: font ? font : FONTS.OpenSansBold,
          fontSize: hp(4),
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
