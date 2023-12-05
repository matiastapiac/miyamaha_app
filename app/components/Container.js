import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {colors} from '../common/colors';

const Container = ({children, bgColor, style}) => {
  bgColor = bgColor ? bgColor : colors.white;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor}}>
      <View style={[style, {flex: 1, backgroundColor: bgColor}]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Container;
