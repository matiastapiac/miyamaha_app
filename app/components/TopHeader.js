import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {images} from '../common/images';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../common/dimensions';

const TopHeader = ({
  label,
  onLeftPress,
  onRightPress,
  leftIcon = images.leftarrow,
  rightIcon,
  style,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    onLeftPress ? onLeftPress() : navigation.goBack();
  };

  const iconSize = label ? hp(2.5) : hp(4);

  return (
    <View style={[styles.container, style, {borderBottomWidth: label ? 1 : 0}]}>
      <TouchableOpacity onPress={handleBack}>
        <Image
          source={leftIcon}
          style={{height: iconSize, width: iconSize}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {label ? (
        <Text style={styles.label}>{label}</Text>
      ) : (
        <Image source={images.logo} resizeMode="contain" style={styles.logo} />
      )}
      <TouchableOpacity onPress={onRightPress}>
        {rightIcon && (
          <Image
            source={rightIcon}
            style={{height: iconSize, width: iconSize}}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

TopHeader.defaultProps = {
  leftIcon: images.leftarrow,
  rightIcon: null,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(8),
    borderBottomColor: colors.border,
  },
  label: {
    color: colors.red,
    fontFamily: FONTS.FjallaOneRegular,
    fontSize: hp(2.5),
  },
  logo: {
    height: hp(18),
    width: hp(18),
  },
});

export default TopHeader;
