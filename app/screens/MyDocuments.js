import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {gstyles} from '../common/gstyles';
import {myDocuments, screen} from '../common/utils';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {images} from '../common/images';
import {strings as str} from '../common/strings';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import DocCard from '../components/DocCard';
import FloatingActionButton from '../components/FloatingButton';
import DocAlert from '../components/DocAlert';

class MyDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  handleEvent(item) {
    item.type == 'folder' &&
      this.props.navigation.push(screen.DocumentList, {item});
  }

  handleCreateFolder = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  renderItem = ({item}) => (
    <DocCard
      icon={item.type == 'pdf' ? images.file : images.folder}
      title={item.name}
      onPress={() => this.handleEvent(item)}
    />
  );

  render() {
    const {isVisible} = this.state;
    return (
      <Container>
        <TopHeader
          label={str.myDocuments}
          bgColor={colors.red}
          iColor={colors.white}
          paddingH={10}
          font={FONTS.OpenSansBold}
        />
        <View style={gstyles.docContent}>
          <FlatList
            data={myDocuments}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
          />
          <FloatingActionButton onLeftPress={this.handleCreateFolder} />
        </View>
        <DocAlert
          visible={isVisible}
          title={str.createFolder}
          onCancel={this.handleCreateFolder}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state?.loading,
  error: state?.error,
});

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(MyDocuments);
