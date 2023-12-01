import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../common/colors';
import {heightPercentageToDP as hp} from '../common/dimensions';
import AuthButton from './AuthButton';
import {FONTS} from '../common/fonts';

const Alert = ({
  visible,
  title,
  subTitle,
  btnTitle = 'Aceptar',
  onSubmit,
  isInfo,
  rightLabel,
}) => {
  return (
    <Modal isVisible={visible}>
      <View style={styles.mainContainer}>
        {isInfo ? (
          <View>
            <Text style={[styles.subTitle, {textAlign: 'right'}]}>
              {rightLabel}
            </Text>
            <Text style={styles.infoTitle}>{title}</Text>
            <Text style={[styles.subTitle, {textAlign: 'left'}]}>
              {subTitle}
            </Text>
          </View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>{title}</Text>
            {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
          </View>
        )}
        <AuthButton title={btnTitle} onPress={onSubmit} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
  },
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
    fontSize: hp(2.5),
    textAlign: 'center',
  },
  infoTitle: {
    color: colors.grey,
    fontFamily: FONTS.OpenSansBold,
    marginBottom: 10,
    fontSize: hp(2),
  },
});

export default Alert;
