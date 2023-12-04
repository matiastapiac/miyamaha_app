import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {images} from '../common/images';
import {gstyles} from '../common/gstyles';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import DocCard from '../components/DocCard';

export default class DocumentList extends Component {
  renderItem = ({item}) => <DocCard icon={images.file} title={item} />;

  render() {
    const {params} = this.props.route;
    return (
      <Container>
        <TopHeader
          label={params?.item?.name}
          bgColor={colors.red}
          iColor={colors.white}
          paddingH={10}
          font={FONTS.OpenSansBold}
        />
        <FlatList
          data={params?.item?.files}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={gstyles.docContent}
        />
      </Container>
    );
  }
}
