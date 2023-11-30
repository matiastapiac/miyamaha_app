import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {
  heightPercentageToDP as wp,
  widthPercentageToDP as hp,
} from '../common/dimensions';
import {images} from '../common/images';

export default function ItemCard({
  icon,
  title,
  subTitle,
  onPress,
  onRadioPress,
  selected,
  leftLabel,
}) {
  return (
    <View>
      <Pressable
        style={[
          styles.container,
          {borderColor: selected ? colors.red : colors.border},
        ]}
        onPress={onPress}>
        <>
          {icon ? (
            <Image source={icon} style={styles.icon} />
          ) : (
            <Pressable onPress={onRadioPress}>
              <Image
                source={selected ? images.roundfill : images.round}
                style={{height: hp(5), width: hp(5), resizeMode: 'contain'}}
              />
            </Pressable>
          )}
        </>
        <View style={styles.rowWrapper}>
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
}

const styles = StyleSheet.create({
  rowWrapper: {
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
    height: hp(10),
    width: hp(10),
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.grey2,
    height: hp(25),
    paddingHorizontal: 10,
    marginVertical: 5,
    width: '100%',
  },
});
