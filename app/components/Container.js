import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../common/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container = ({children, bgColor, style}) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        style,
        {backgroundColor: bgColor ? bgColor : colors.white},
      ]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
