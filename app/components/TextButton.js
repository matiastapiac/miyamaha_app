import React, {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
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
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleButtonPress = () => {
    if (isButtonDisabled) {
      return;
    }

    setButtonDisabled(true);

    onPress && onPress();

    setTimeout(() => {
      setButtonDisabled(false);
    }, 2000);
  };

  return (
    <Pressable
      style={{alignSelf: position, marginVertical: 5}}
      onPress={handleButtonPress}
      disabled={isButtonDisabled}
      accessibilityRole="button"
      accessibilityState={{disabled: isButtonDisabled}}>
      <Text style={[styles.buttonText, {color, fontFamily: font}]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: hp(2),
  },
});

export default TextButton;
