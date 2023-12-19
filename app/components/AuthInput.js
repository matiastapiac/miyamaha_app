import React from 'react';
import {StyleSheet, Image, TextInput, View, Platform, Text} from 'react-native';
import {heightPercentageToDP as hp} from '../common/dimensions';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';

const AuthInput = ({
  icon,
  value,
  placeholder,
  onChangeText,
  label,
  textarea,
  editable,
  secureTextEntry,
  onTouchStart,
}) => {
  const renderInputField = () => {
    if (textarea || label) {
      return (
        <TextInput
          multiline={textarea}
          numberOfLines={textarea ? 4 : 1}
          value={value}
          onChangeText={onChangeText}
          onTouchStart={onTouchStart}
          placeholder={placeholder}
          placeholderTextColor={colors.grey1}
          style={textarea ? styles.textArea : styles.labelInput}
          accessible={true}
          accessibilityLabel={label || placeholder}
          editable={editable}
          secureTextEntry={secureTextEntry}
        />
      );
    } else {
      return (
        <View style={styles.iconContent}>
          <Image source={icon} resizeMode="contain" style={styles.icon} />
          <TextInput
            placeholderTextColor={colors.grey1}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            accessible={true}
            accessibilityLabel={placeholder}
            secureTextEntry={secureTextEntry}
          />
        </View>
      );
    }
  };

  return (
    <View style={label ? styles.labelContain : styles.container}>
      {label && <Text style={styles.labelText}>{label}</Text>}
      {renderInputField()}
    </View>
  );
};

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
    backgroundColor: colors.grey3,
    fontFamily: FONTS.OpenSansRegular,
    paddingHorizontal: 10,
    width: '100%',
    height: hp(8),
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.grey,
    fontFamily: FONTS.OpenSansMedium,
    fontSize: hp(2),
  },
  icon: {
    height: hp(3),
    width: hp(3),
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
    backgroundColor: colors.grey3,
    fontFamily: FONTS.OpenSansRegular,
    color: colors.grey1,
    textAlignVertical: 'top',
  },
  iconContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default AuthInput;
