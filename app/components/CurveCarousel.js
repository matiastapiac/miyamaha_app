// import React, {useState, useRef} from 'react';
// import {Animated, FlatList, Image, StyleSheet, Text, View} from 'react-native';
// import {vehicles} from '../common/utils';
// import {colors} from '../common/colors';
// import {FONTS} from '../common/fonts';
// import {strings as str} from '../common/strings';

// export default function CurveCarousel() {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const flatListRef = useRef(null);

//   const onViewableItemsChanged = useRef(({viewableItems}) => {
//     if (viewableItems && viewableItems.length > 0) {
//       const index = viewableItems[0].index || 0;
//       setSelectedIndex(index);
//     }
//   });

//   return (
//     <View>
//       <FlatList
//         ref={flatListRef}
//         data={vehicles}
//         keyExtractor={item => item.id}
//         horizontal
//         renderItem={({item, index}) => (
//           <Animated.View
//             style={{
//               height: selectedIndex == index ? 300 : 180,
//               width: selectedIndex == index ? 300 : 200,
//               opacity: selectedIndex == index ? 1 : 0.5,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <Image
//               source={item.image}
//               style={{
//                 height: selectedIndex == index ? 400 : 200,
//                 width: selectedIndex == index ? 400 : 300,
//                 resizeMode: 'contain',
//               }}
//             />
//           </Animated.View>
//         )}
//         onViewableItemsChanged={onViewableItemsChanged.current}
//         viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
//         showsHorizontalScrollIndicator={false}
//       />
//       <Text style={styles.vehicle}>{vehicles[selectedIndex].vehicle}</Text>
//       <View style={styles.dotContainer}>
//         {vehicles.map((_, index) => {
//           const backgroundColor =
//             index === selectedIndex ? colors.red : colors.white;

//           return (
//             <View
//               key={index.toString()}
//               style={[styles.dot, {backgroundColor}]}
//             />
//           );
//         })}
//       </View>
//       <Text style={styles.dateText}>{vehicles[selectedIndex].date}</Text>
//       <View style={styles.line} />
//       <Text style={styles.mediumText}>{str.lastMaintenance}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mediumText: {
//     textAlign: 'center',
//     color: colors.grey,
//     fontFamily: FONTS.OpenSansRegular,
//   },
//   line: {
//     width: '20%',
//     alignSelf: 'center',
//     marginVertical: 5,
//     borderBottomWidth: 2,
//     borderBottomColor: colors.red,
//   },
//   dateText: {
//     textAlign: 'center',
//     color: colors.grey,
//     fontFamily: FONTS.OpenSansBold,
//   },
//   vehicle: {
//     textAlign: 'center',
//     marginTop: -80,
//     marginBottom: 10,
//     color: colors.red,
//     fontFamily: FONTS.FjallaOneRegular,
//     fontSize: 30,
//   },
//   dotContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 100,
//     borderWidth: 1,
//     borderColor: colors.red,
//     marginHorizontal: 5,
//   },
// });
import React, {useRef, useState} from 'react';
import {View, FlatList, Animated, Image, Dimensions} from 'react-native';
import {vehicles} from '../common/utils';

const YourComponent = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width: screenWidth} = Dimensions.get('window');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderItem = ({item, index}) => {
    const inputRange = [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={{opacity, borderWidth: 1}}>
        <Image
          source={item.image}
          style={{width: screenWidth, height: index == selectedIndex ? 100 :  200, resizeMode: 'contain'}}
        />
      </Animated.View>
    );
  };

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false}, // Important: Set useNativeDriver to false
  );

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems && viewableItems.length > 0) {
      const index = viewableItems[0].index || 0;
      setSelectedIndex(index);
    }
  }).current;

  return (
    <View>
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16} // Adjust the throttle value as needed
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
      />
    </View>
  );
};

export default YourComponent;
