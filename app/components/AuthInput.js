import React from 'react';
import {StyleSheet, Image, TextInput, View, Platform, Text} from 'react-native';
import {
  heightPercentageToDP as wp,
  widthPercentageToDP as hp,
} from '../common/dimensions';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';

export default function AuthInput({
  icon,
  value,
  placeholder,
  onChangeText,
  style,
  label,
  textarea,
}) {
  return label ? (
    <View style={styles.labelContain}>
      <Text style={styles.labelText}>{label}</Text>
      {textarea ? (
        <TextInput
          multiline
          numberOfLines={4}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.grey1}
          style={styles.textArea}
        />
      ) : (
        <TextInput
          placeholderTextColor={colors.grey1}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.labelInput}
        />
      )}
    </View>
  ) : (
    <View style={[styles.container, style]}>
      <Image source={icon} resizeMode="contain" style={styles.icon} />
      <TextInput
        placeholderTextColor={colors.grey1}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  labelContain: {
    marginVertical: 15,
  },
  labelText: {
    marginLeft: 10,
    color: colors.grey,
    fontFamily: FONTS.OpenSansSemiBold,
  },
  labelInput: {
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.grey1,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: colors.grey2,
    fontFamily: FONTS.OpenSansRegular,
    paddingHorizontal: 10,
    width: '100%',
    height: hp(15),
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.grey,
    fontFamily: FONTS.OpenSansMedium,
    fontSize: hp(3.5),
  },
  icon: {
    height: hp(5),
    width: hp(5),
  },
  container: {
    borderColor: colors.border,
    borderWidth: 2,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(212, 212, 212, 0.5)',
    paddingVertical: Platform.OS == 'ios' ? 12 : 0,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    borderRadius: 5,
    minHeight: 150, 
    backgroundColor: colors.grey2,
    fontFamily: FONTS.OpenSansRegular,
    color: colors.grey1,
    textAlignVertical: 'top',
  },
});
