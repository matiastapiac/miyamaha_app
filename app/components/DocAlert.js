import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../common/colors';
import {heightPercentageToDP as hp} from '../common/dimensions';
import {FONTS} from '../common/fonts';
import {strings as str} from '../common/strings';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';

export default function DocAlert({
  visible,
  title,
  onCancel,
  onCreate,
  value,
  onChangeText,
}) {
  return (
    <Modal isVisible={visible}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <AuthInput
          label={str.specifyFolderName}
          placeholder={str.folderName}
          value={value}
          onChangeText={onChangeText}
        />
        <AuthButton title={str.create} onPress={onCreate} />
        <AuthButton
          title={str.cancel}
          style={{backgroundColor: colors.black}}
          onPress={onCancel}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  title: {
    color: colors.red,
    fontFamily: FONTS.FjallaOneRegular,
    marginBottom: 10,
    fontSize: hp(2.5),
    textAlign: 'center',
    paddingBottom: 10,
    borderBottomColor: colors.grey5,
    borderBottomWidth: 1,
  },
});
