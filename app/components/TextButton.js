import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {heightPercentageToDP as hp} from '../common/dimensions';

const TextButton = ({
  title,
  onPress,
  color = colors.red,
  font = FONTS.OpenSansBold,
  position = 'flex-start',
}) => {
  return (
    <TouchableOpacity
      style={{alignSelf: position, marginVertical: 5}}
      onPress={onPress}
      accessibilityRole="button">
      <Text style={[styles.buttonText, {color, fontFamily: font}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: hp(2),
  },
});

export default TextButton;
