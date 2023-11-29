import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from './dimensions';
import { FONTS } from './fonts';
import { colors } from './colors';

export const gstyles = StyleSheet.create({
  bottomBtn: {bottom: 0, position: 'absolute'},
  tabIcon: {
    height: hp(3),
    width: hp(3),
  },
  tabLabel: {
    fontSize:wp(2.5),
    fontFamily:FONTS.OpenSansMedium
  },
  tabBar:{
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth:0,
    shadowOpacity: 0,
    elevation: 0,
    height:hp(8),
    paddingBottom:10
  }
});
