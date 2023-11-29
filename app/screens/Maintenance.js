import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import {images} from '../common/images';

export default class Maintenance extends Component {
  render() {
    return (
      <Container>
        <TopHeader leftIcon={images.profile} rightIcon={images.bell} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
