import React, {useState} from 'react';
import {Keyboard, Pressable, StyleSheet, Text} from 'react-native';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {heightPercentageToDP as hp} from '../common/dimensions';

const AuthButton = ({title, style, onPress, disabled, textStyle}) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const opacity = disabled ? 0.6 : 1;

  const handleButtonPress = () => {
    if (isButtonDisabled) {
      return;
    }
    setButtonDisabled(true);

    onPress && onPress();
    Keyboard.dismiss()

    setTimeout(() => {
      setButtonDisabled(false);
    }, 2000);
  };

  return (
    <Pressable
      style={[styles.button, style, {opacity: opacity}]}
      onPress={handleButtonPress}
      disabled={disabled || isButtonDisabled}
      accessibilityRole="button"
      accessibilityState={{disabled: isButtonDisabled}}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </Pressable>
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
  title: {
    color: colors.white,
    fontSize: hp(2),
    fontFamily: FONTS.OpenSansBold,
    textAlign: 'center',
  },
});

export default AuthButton;
