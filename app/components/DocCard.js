// import React from 'react';
// import {Image, Pressable, StyleSheet, Text} from 'react-native';
// import {heightPercentageToDP as hp} from '../common/dimensions';
// import {colors} from '../common/colors';
// import {FONTS} from '../common/fonts';

// const DocCard = ({icon, title, onPress}) => {
//   return (
//     <Pressable
//       style={styles.container}
//       onPress={onPress}
//       accessibilityRole="button">
//       <Image source={icon} style={styles.icon} accessibilityLabel={title} />
//       <Text style={styles.title}>{title}</Text>
//     </Pressable>
//   );
// };

// const styles = StyleSheet.create({

//   container: {
//     flexDirection: 'row',
//     marginHorizontal: 10,
//     paddingVertical: 10,
//     borderBottomColor: colors.border,
//     borderBottomWidth: 1,
//     alignItems: 'center',
//   },
//   icon: {
//     height: hp(3),
//     width: hp(3),
//     resizeMode: 'contain',
//   },
//   title: {
//     color: colors.grey,
//     fontFamily: FONTS.OpenSansMedium,
//     marginLeft: 10,
//   },
// });

// export default DocCard;

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {heightPercentageToDP as hp} from '../common/dimensions';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';

const DocCard = ({icon, title, onPress, onDelete}) => {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Text style={styles.deleteText}>Eliminar</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView>
      <Pressable style={styles.container} onPress={onPress}>
        <Swipeable
          renderRightActions={renderRightActions}
          containerStyle={{flex: 1}}>
          <View style={styles.rowWrapper}>
            <Image
              source={icon}
              style={styles.icon}
              accessibilityLabel={title}
            />
            <Text style={styles.title}>{title}</Text>
          </View>
        </Swipeable>
      </Pressable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 8,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  icon: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
  },
  title: {
    color: colors.grey,
    fontFamily: FONTS.OpenSansMedium,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 8,
  },
  deleteText: {
    color: colors.white,
    fontSize: hp(2),
    fontFamily: FONTS.OpenSansMedium,
  },
  rowWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default DocCard;
