import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {heightPercentageToDP as hp} from '../common/dimensions';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';

const DocCard = ({icon, title, onPress}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      accessibilityRole="button">
      <Image source={icon} style={styles.icon} accessibilityLabel={title} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

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
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
  },
  title: {
    color: colors.grey,
    fontFamily: FONTS.OpenSansMedium,
    marginLeft: 10,
  },
});

export default DocCard;
