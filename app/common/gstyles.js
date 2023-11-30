import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from './dimensions';
import {FONTS} from './fonts';
import {colors} from './colors';

export const gstyles = StyleSheet.create({
  bottomBtn: {bottom: 0, position: 'absolute'},
  tabIcon: {
    height: hp(3),
    width: hp(3),
  },
  tabLabel: {
    fontSize: wp(2.5),
    fontFamily: FONTS.OpenSansMedium,
  },
  tabBar: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
    height: hp(8),
    paddingBottom: 10,
  },
  itemConatiner: {
    flex: 1,
    marginHorizontal: 10,
  },
  itemContent: {flexGrow: 1, justifyContent: 'center'},
  notifContent: {paddingBottom: hp(10)},
  plusIcon: {
    height: hp(8),
    width: hp(8),
    resizeMode: 'contain',
  },
  plusBtn: {
    bottom: 0,
    position: 'absolute',
    marginBottom: 15,
    alignSelf:'center'
  },
  docContent: {
    marginTop: 10
  },
  dealersTitle: {
    fontFamily:FONTS.OpenSansBold,
    color:colors.grey,
    textAlign:'center',
    marginVertical:10
  }
});
