import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  heightPercentageToDP as wp,
  widthPercentageToDP as hp,
} from '../common/dimensions';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {images} from '../common/images';

export default function PickerInput({label, data, setSelected, placeholder}) {
  return (
    <View style={styles.labelContain}>
      <Text style={styles.labelText}>{label}</Text>
      <SelectList
        setSelected={setSelected}
        data={data}
        save="value"
        placeholder={placeholder}
        searchPlaceholder={placeholder}
        fontFamily={FONTS.OpenSansMedium}
        arrowicon={<Image source={images.arrow} style={styles.arrow} />}
        boxStyles={styles.box}
        dropdownTextStyles={{color: colors.grey1}}
        dropdownStyles={{borderColor: colors.border}}
        inputStyles={{color: colors.grey1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    height: hp(4),
    width: hp(4),
    resizeMode: 'contain',
  },
  box: {
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
    alignItems: 'center',
  },
  labelContain: {
    marginVertical: 15,
  },
  labelText: {
    marginLeft: 10,
    color: colors.grey,
    fontFamily: FONTS.OpenSansSemiBold,
  },
});
