import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {heightPercentageToDP as hp} from '../common/dimensions';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {images} from '../common/images';

const PickerInput = ({label, data, setSelected, placeholder}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <SelectList
        setSelected={setSelected}
        data={data}
        save="value"
        placeholder={placeholder}
        searchPlaceholder={placeholder}
        fontFamily={FONTS.OpenSansMedium}
        arrowicon={<Image source={images.arrow} style={styles.arrowIcon} />}
        boxStyles={styles.box}
        dropdownTextStyles={styles.dropdownText}
        dropdownStyles={styles.dropdown}
        inputStyles={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  label: {
    marginLeft: 10,
    color: colors.grey,
    fontFamily: FONTS.OpenSansSemiBold,
  },
  arrowIcon: {
    height: hp(2),
    width: hp(2),
    resizeMode: 'contain',
  },
  box: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: colors.grey2,
    fontFamily: FONTS.OpenSansRegular,
    paddingHorizontal: 10,
    width: '100%',
    height: hp(8),
    alignItems: 'center',
  },
  dropdownText: {
    color: colors.grey1,
  },
  dropdown: {
    borderColor: colors.border,
  },
  input: {
    color: colors.grey1,
  },
});

export default PickerInput;
