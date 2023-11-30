import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as wp,
  widthPercentageToDP as hp,
} from '../common/dimensions';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';

export default function DocCard({icon, title, onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  icon: {
    height: hp(6),
    width: hp(6),
    resizeMode: 'contain',
  },
  title: {
    color: colors.grey,
    fontFamily: FONTS.OpenSansMedium,
    marginLeft: 10,
  },
});
