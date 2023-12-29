import React from 'react';
import {StyleSheet, Text, Image, View, Pressable} from 'react-native';
import {Popover, usePopover} from 'react-native-modal-popover';
import {images} from '../common/images';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {heightPercentageToDP as hp} from '../common/dimensions';

export default function PopoverMenu({onMenu1, onMenu2}) {
  const {
    openPopover,
    closePopover,
    popoverVisible,
    touchableRef,
    popoverAnchorRect,
  } = usePopover();
  return (
    <View>
      <Pressable ref={touchableRef} onPress={openPopover}>
        <Image source={images.menu} style={styles.menu} resizeMode="contain" />
      </Pressable>
      <Popover
        contentStyle={styles.content}
        placement="bottom"
        arrowStyle={styles.arrow}
        backgroundStyle={styles.background}
        visible={popoverVisible}
        onClose={closePopover}
        fromRect={popoverAnchorRect}
        supportedOrientations={['portrait', 'landscape']}>
        <Pressable
          style={styles.wrapper}
          onPress={() => {
            closePopover();
            onMenu1();
          }}>
          <Image source={images.padlock} style={styles.icon} />
          <Text style={styles.labelTxt}>Cambiar contraseña</Text>
        </Pressable>
        <Pressable
          style={styles.wrapper}
          onPress={() => {
            closePopover();
            onMenu2();
          }}>
          <Image
            source={images.logout}
            style={[styles.icon, {tintColor: colors.red}]}
          />
          <Text style={[styles.labelTxt, {color: colors.red}]}>
            Cerrar sesión
          </Text>
        </Pressable>
      </Popover>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    height: 20,
    width: 20,
    tintColor: colors.red,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  labelTxt: {
    marginLeft: 10,
    fontFamily: FONTS.OpenSansMedium,
    fontSize: hp(2),
  },
  content: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  arrow: {
    borderTopColor: 'transparent',
  },
  background: {
    backgroundColor: 'rgba(212, 212, 212, 0.5)',
  },
});
