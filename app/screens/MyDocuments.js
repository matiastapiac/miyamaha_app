import React, {Component} from 'react';
import {FlatList, Image, Pressable} from 'react-native';
import {gstyles} from '../common/gstyles';
import {myDocuments, screen} from '../common/utils';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {images} from '../common/images';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import DocCard from '../components/DocCard';

export default class MyDocuments extends Component {
  handleEvent(item) {
    item.type == 'folder' &&
      this.props.navigation.push(screen.DocumentList, {item});
  }

  renderItem = ({item}) => (
    <DocCard
      icon={item.type == 'pdf' ? images.file : images.folder}
      title={item.name}
      onPress={() => this.handleEvent(item)}
    />
  );

  render() {
    return (
      <Container>
        <TopHeader
          label={'Mis Documentos'}
          bgColor={colors.red}
          iColor={colors.white}
          paddingH={10}
          font={FONTS.OpenSansBold}
        />
        <FlatList
          data={myDocuments}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={gstyles.docContent}
        />
        <Pressable style={gstyles.plusBtn}>
          <Image source={images.plus} style={gstyles.plusIcon} />
        </Pressable>
      </Container>
    );
  }
}
