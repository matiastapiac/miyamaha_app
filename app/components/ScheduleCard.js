import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {images} from '../common/images';
import {FONTS} from '../common/fonts';
import {colors} from '../common/colors';
import {heightPercentageToDP as hp} from '../common/dimensions';
import moment from 'moment';
import 'moment/locale/es';

export default function ScheduleCard({km, name, address, date}) {
  moment.locale('es');
  const fm = moment(date).format('DD MMM YYYY');
  const e = fm.split(' ');
  return (
    <View>
      <Pressable style={styles.container}>
        <View style={styles.dateContain}>
          <Text style={styles.text1}>{e[0]}</Text>
          <Text style={styles.text2}>{e[1]}</Text>
          <Text style={styles.text3}>{e[2]}</Text>
        </View>
        <View style={styles.line} />
        <View style={{justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={images.km} style={styles.icon} />
            <Text
              style={{
                ...styles.darkText,
                marginLeft: 10,
              }}>
              {km}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <Image source={images.dealer} style={styles.icon} />
            <View style={{marginLeft: 10}}>
              <Text style={styles.darkText}>{name}</Text>
              <Text numberOfLines={1} style={styles.lightText}>
                {address}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    marginHorizontal: 10,
  },
  container: {
    backgroundColor: colors.grey3,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  dateContain: {
    alignItems: 'center',
    width: '20%',
  },
  text1: {
    color: colors.red,
    fontSize: hp(3),
    fontFamily: FONTS.OpenSansBold,
  },
  text2: {
    color: colors.red,
    fontSize: hp(1.5),
    fontFamily: FONTS.OpenSansRegular,
    textTransform: 'uppercase',
  },
  text3: {
    color: colors.red,
    fontSize: hp(1.8),
    fontFamily: FONTS.OpenSansSemiBold,
  },
  icon: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: 'contain',
  },
  darkText: {
    fontFamily: FONTS.OpenSansBold,
    color: colors.grey,
  },
  lightText: {
    fontFamily: FONTS.OpenSansRegular,
    color: colors.grey,
    fontSize: hp(1.5),
  },
});
