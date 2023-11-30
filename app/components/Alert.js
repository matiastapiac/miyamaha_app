import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../common/colors';
import {
  heightPercentageToDP as wp,
  widthPercentageToDP as hp,
} from '../common/dimensions';
import AuthButton from './AuthButton';
import {FONTS} from '../common/fonts';

export default function Alert({visible, title, subTitle, btnTitle, onSubmit}) {
  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <AuthButton
          title={btnTitle ? btnTitle : 'Aceptar'}
          onPress={onSubmit}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    color: colors.grey1,
    fontFamily: FONTS.OpenSansMedium,
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    color: colors.red,
    fontFamily: FONTS.FjallaOneRegular,
    marginBottom: 10,
    fontSize: hp(4),
    textAlign: 'center',
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
