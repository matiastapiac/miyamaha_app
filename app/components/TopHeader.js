import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {images} from '../common/images';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {screen} from '../common/utils';
import {heightPercentageToDP as hp} from '../common/dimensions';
import PopoverMenu from './PopoverMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TopHeader({
  label,
  bgColor,
  iColor,
  paddingH,
  font,
  onLeftPress,
  rightIcon,
  onMenu1,
  onMenu2,
}) {
  const navigation = useNavigation();
  const iconSize = label ? hp(2.5) : hp(4);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [flag, setFlag] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      getFlag();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getFlag = async () => {
    const flag = await AsyncStorage.getItem('flag');
    flag ? setFlag(flag) : setFlag('');
  };

  const handleBack = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);
      onLeftPress
        ? onLeftPress()
        : label
        ? navigation.goBack()
        : navigation.push(screen.Profile);
    }
  };

  const handleRightPress = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);
      navigation.push(screen.Notification);
    }
  };

  const renderLeftIcon = () => {
    return (
      <Pressable onPress={handleBack} disabled={isButtonDisabled}>
        <Image
          source={label ? images.leftarrow : images.profile}
          style={{height: iconSize, width: iconSize, tintColor: iColor}}
          resizeMode="contain"
        />
      </Pressable>
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
      rightIcon ? (
        <PopoverMenu onMenu1={onMenu1} onMenu2={onMenu2} />
      ) : (
        <View style={{height: iconSize, width: iconSize}}></View>
      )
    ) : (
      <Pressable onPress={handleRightPress} disabled={isButtonDisabled}>
        {flag == '1' && <Image source={images.vRed} style={styles.badge} />}
        <Image
          source={images.bell}
          style={{height: iconSize, width: iconSize}}
          resizeMode="contain"
        />
      </Pressable>
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
  badge: {
    height: hp(1),
    width: hp(1),
    alignSelf: 'flex-end',
    top: 5,
  },
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
