import {Platform, StyleSheet} from 'react-native';
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
    height: hp(9),
    paddingBottom: hp(2),
    // Platform.OS == 'ios' ? 20 : 10,
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
    alignSelf: 'center',
  },
  docContent: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  dealersTitle: {
    fontFamily: FONTS.OpenSansBold,
    color: colors.grey,
    textAlign: 'center',
    marginVertical: 10,
  },
  listContainer: {marginBottom: '20%', backgroundColor: colors.white},
  vehicleContent: {height: hp(10)},
  fjallaText: {
    color: colors.red,
    fontFamily: FONTS.FjallaOneRegular,
    fontSize: hp(2.5),
    textAlign: 'center',
    marginVertical: 10,
  },
  labelText: {
    marginLeft: 10,
    color: colors.grey,
    fontFamily: FONTS.OpenSansSemiBold,
  },
  docText: {
    textAlign: 'center',
    fontFamily: FONTS.OpenSansRegular,
  },
  docView: {
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  spinnerText: {
    fontFamily: FONTS.OpenSansRegular,
    color: colors.white,
    fontSize: hp(2),
  },
  flashMsg: {
    marginHorizontal: Platform.select({android: 10}),
    marginTop: Platform.select({android: 10}),
    borderRadius: Platform.select({android: 5}),
  },
  NoText: {
    fontFamily: FONTS.OpenSansRegular,
    color: colors.grey,
    fontSize: hp(2),
    textAlign:'center'
  },
  validation:{ 
    color:colors.red,
    fontSize:hp(1.5),
    fontFamily: FONTS.OpenSansRegular,
  }
});
