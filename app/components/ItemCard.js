import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {heightPercentageToDP as hp} from '../common/dimensions';
import {images} from '../common/images';

const ItemCard = ({
  icon,
  title,
  subTitle,
  onPress,
  onRadioPress,
  selected,
  leftLabel,
  style,
}) => {
  const renderIcon = () => {
    if (icon) {
      return <Image source={icon} style={styles.icon} />;
    } else {
      return (
        <Pressable onPress={onRadioPress}>
          <Image
            source={selected ? images.roundfill : images.round}
            style={styles.radioIcon}
          />
        </Pressable>
      );
    }
  };

  return (
    <View>
      <Pressable
        style={[
          styles.container,
          {borderColor: selected ? colors.red : colors.border},
          style,
        ]}
        onPress={onPress}>
        {renderIcon()}
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
      </Pressable>
      {leftLabel && (
        <Text
          style={[styles.subTitle, {alignSelf: 'flex-end', marginBottom: 5}]}>
          {leftLabel}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    marginLeft: 10,
  },
  subTitle: {
    maxWidth: 290,
    fontFamily: FONTS.OpenSansRegular,
    color: colors.grey,
    fontSize: 13,
  },
  title: {
    fontFamily: FONTS.OpenSansBold,
    color: colors.grey,
  },
  icon: {
    height: hp(5),
    width: hp(5),
    resizeMode: 'contain',
  },
  radioIcon: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.grey3,
    height: hp(13),
    paddingHorizontal: 10,
    marginVertical: 5,
    width: '100%',
  },
});

export default ItemCard;
