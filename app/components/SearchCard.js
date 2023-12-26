import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {colors} from '../common/colors';
import {images} from '../common/images';
import {FONTS} from '../common/fonts';
import {heightPercentageToDP as hp} from '../common/dimensions';

export default function SearchCard({title, address, time, phone, email}) {
  const businessHours = time && time.split('. ');

  const addUrl = Platform.select({
    ios: `http://maps.apple.com/?q=${address}`,
    android: `geo:0,0?q=${address}`,
  });

  const linking = data => {
    const phoneUrl = Platform.select({
      ios: `telprompt:${data}`,
      android: `tel:${data}`,
    });
    Linking.openURL(phoneUrl);
  };

  const renderTime = () => {
    return businessHours.map((item, index) => {
      const parts =
        businessHours.length > 1 ? item.split(' de ') : businessHours;
      return (
        <View key={index} style={styles.list}>
          <Text
            style={[styles.lightFont, {fontFamily: FONTS.OpenSansSemiBold}]}>
            {parts[0]}
          </Text>
          <Text style={styles.lightFont}>
            {parts.length > 1 &&
              parts[1].replace('a', '-').replace(' hrs', '').replace('.', '')}
          </Text>
        </View>
      );
    });
  };

  const renderContactInfo = (icon, content, isLine) => {
    if (!content) return null;

    const parts = content.split(' | ').map((part, index) => (
      <Pressable key={index}>
        <Text
          onPress={() => linking(part)}
          style={[
            styles.rightContent,
            styles.lightFont,
            {
              fontFamily: FONTS.OpenSansSemiBold,
              textDecorationLine: 'underline',
            },
          ]}>
          {part}
        </Text>
      </Pressable>
    ));

    return (
      <View style={[styles.itemWrapper, {borderBottomColor: colors.grey3}]}>
        <Image source={icon} style={styles.icon} />
        <Text>
          {parts.length > 1 ? (
            <>
              {parts[0]}
              <View>
                <Text>{'   '}|</Text>
              </View>
              {parts[1]}
            </>
          ) : (
            <Pressable>
              <Text
                onPress={() => isLine && linking(content)}
                style={[
                  styles.rightContent,
                  styles.lightFont,
                  {
                    textDecorationLine: isLine ? 'underline' : 'none',
                    fontFamily: FONTS.OpenSansSemiBold,
                  },
                ]}>
                {content}
              </Text>
            </Pressable>
          )}
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
          <Pressable
            onPress={() =>
              Linking.openURL(addUrl)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            }>
            <Text
              style={[styles.lightFont, {textDecorationLine: 'underline'}]}
              numberOfLines={1}>
              {address}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.itemWrapper, {alignItems: 'flex-start'}]}>
        <Image source={images.calendar} style={styles.icon} />
        <Text style={[styles.lightFont, styles.rightContent]} numberOfLines={2}>
          {time ? time : '-'}
        </Text>
        {/* {time && <View style={styles.rightContent}>{renderTime()}</View>} */}
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
