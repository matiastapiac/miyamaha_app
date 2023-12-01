import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../common/colors';
import {images} from '../common/images';
import {FONTS} from '../common/fonts';
import {heightPercentageToDP as hp} from '../common/dimensions';

export default function SearchCard({title, address, time = [], phone, email}) {
  const renderTime = () => {
    return time.map((item, index) => (
      <View key={index} style={styles.list}>
        <Text style={[styles.lightFont, {fontFamily: FONTS.OpenSansSemiBold}]}>
          {item.day}
        </Text>
        <Text style={styles.lightFont}>{item.timing}</Text>
      </View>
    ));
  };

  const renderContactInfo = (icon, content, isLine) => {
    if (!content) return null;

    return (
      <View style={[styles.itemWrapper, {borderBottomColor: colors.grey3}]}>
        <Image source={icon} style={styles.icon} />
        <Text
          style={[
            styles.rightContent,
            styles.lightFont,
            {textDecorationLine: isLine, fontFamily:FONTS.OpenSansSemiBold},
          ]}>
          {content}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemWrapper}>
        <Image source={images.marker} style={styles.icon} />
        <View style={styles.rightContent}>
          <Text style={styles.titleFont}>{title}</Text>
          <Text
            style={[styles.lightFont, {textDecorationLine: 'underline'}]}
            numberOfLines={1}>
            {address}
          </Text>
        </View>
      </View>
      <View style={[styles.itemWrapper, {alignItems: 'flex-start'}]}>
        <Image source={images.calendar} style={styles.icon} />
        <View style={styles.rightContent}>{renderTime()}</View>
      </View>
      {renderContactInfo(images.phone, phone, 'underline')}
      {renderContactInfo(images.mail, email)}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  lightFont: {
    color: colors.grey,
    fontFamily: FONTS.OpenSansRegular,
  },
  titleFont: {
    color: colors.red,
    fontFamily: FONTS.FjallaOneRegular,
    fontSize: hp(3),
    textTransform: 'uppercase',
  },
  rightContent: {
    marginLeft: 10,
    flex: 1,
  },
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: colors.grey3,
    paddingVertical: 5,
  },
  icon: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    borderBottomColor: colors.grey4,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 5,
  },
});
