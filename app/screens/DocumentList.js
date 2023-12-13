import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {images} from '../common/images';
import {gstyles} from '../common/gstyles';
import {strings as str} from '../common/strings';
import Container from '../components/Container';
import TopHeader from '../components/TopHeader';
import DocCard from '../components/DocCard';
import FloatingActionButton from '../components/FloatingButton';
import DocAlert from '../components/DocAlert';

class DocumentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  handleCreateFolder = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  renderItem = ({item}) => <DocCard icon={images.file} title={item} />;

  render() {
    const {params} = this.props.route;
    const {isVisible} = this.state;
    return (
      <Container>
        <TopHeader
          label={params?.item?.name}
          bgColor={colors.red}
          iColor={colors.white}
          paddingH={10}
          font={FONTS.OpenSansBold}
        />
        <View style={gstyles.docContent}>
          <FlatList
            data={params?.item?.files}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={gstyles.docContent}
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

export default connect(mapStateToProps, mapStateToDispatch)(DocumentList);
