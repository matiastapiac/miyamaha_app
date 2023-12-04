import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {images} from '../common/images';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {screen} from '../common/utils';
import {heightPercentageToDP as hp} from '../common/dimensions';

export default function TopHeader({
  label,
  bgColor,
  iColor,
  paddingH,
  font,
  onLeftPress,
}) {
  const navigation = useNavigation();
  const iconSize = label ? hp(2.5) : hp(4);

  const handleBack = () => {
    onLeftPress
      ? onLeftPress()
      : label
      ? navigation.goBack()
      : navigation.push(screen.Profile);
  };

  const handleRightPress = () => {
    navigation.push(screen.Notification);
  };

  const renderLeftIcon = () => {
    return (
      <TouchableOpacity onPress={handleBack}>
        <Image
          source={label ? images.leftarrow : images.profile}
          style={{height: iconSize, width: iconSize, tintColor: iColor}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const renderMiddleContent = () => {
    if (label) {
      return (
        <Text
          style={[
            styles.label,
            {
              color: iColor || colors.red,
              fontFamily: font || FONTS.FjallaOneRegular,
            },
          ]}>
          {label}
        </Text>
      );
    } else {
      return (
        <Image source={images.logo} resizeMode="contain" style={styles.logo} />
      );
    }
  };

  const renderRightIcon = () => {
    return label ? (
      <View style={{height: iconSize, width: iconSize}}></View>
    ) : (
      <TouchableOpacity onPress={handleRightPress}>
        <Image
          source={images.bell}
          style={{height: iconSize, width: iconSize}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: label ? 1 : 0,
          marginHorizontal: label ? 0 : 10,
          paddingHorizontal: paddingH,
          backgroundColor: bgColor,
        },
      ]}>
      {renderLeftIcon()}
      {renderMiddleContent()}
      {renderRightIcon()}
    </View>
  );
}

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
    textTransform: 'uppercase',
  },
  logo: {
    height: hp(18),
    width: hp(18),
  },
});
