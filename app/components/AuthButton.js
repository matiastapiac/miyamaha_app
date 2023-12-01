import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {heightPercentageToDP as hp} from '../common/dimensions';

const AuthButton = ({title, style, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.buttonDisabled : null, style]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{disabled}}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.red,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignSelf: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  title: {
    color: colors.white,
    fontSize: hp(2),
    fontFamily: FONTS.OpenSansSemiBold,
  },
});

export default AuthButton;
