import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

export default function Alert({visible,title, subTitle}) {
  return (
    <Modal isVisible={visible}>
      <View>
        <Text>{title}</Text>
        <Text>{subTitle}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
