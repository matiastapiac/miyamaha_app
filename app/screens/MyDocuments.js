import React, {Component} from 'react';
import {FlatList, Linking, View} from 'react-native';
import {connect} from 'react-redux';
import DocumentPicker, {types} from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {gstyles} from '../common/gstyles';
import {screen} from '../common/utils';
import {colors} from '../common/colors';
import {FONTS} from '../common/fonts';
import {images} from '../common/images';
import {strings as str} from '../common/strings';
import {
  getDocuments,
  createFolder,
  uploadDocument,
  deleteDocument,
} from '../store/actions/documentActions';
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
      documents: [],
      folderName: '',
      file: [],
    };
  }

  componentDidMount() {
    this.props.getDocuments();
  }

  componentDidUpdate(prevProps) {
    const {documents, folder, file, isDelete} = this.props;
    if (
      documents &&
      documents?.status === 'success' &&
      documents !== prevProps.documents
    ) {
      this.setState({
        documents: documents.data.filter(i => i.documentFolderpath == '/'),
      });
    }
    if (
      (folder && folder.status === 'success' && folder !== prevProps.folder) ||
      (file && file.status === 'success' && file !== prevProps.file) ||
      (isDelete &&
        isDelete.status === 'success' &&
        isDelete !== prevProps.isDelete)
    ) {
      this.setState({folderName: ''});
      this.props.getDocuments();
    }
  }

  handleEvent(item) {
    item.documentType == 'folder'
      ? this.props.navigation.push(screen.DocumentList, {item})
      : Linking.openURL(item.documentUrl);
  }

  handleFolderBtn = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  handleCreateFolder = () => {
    this.props.createFolder('/', this.state.folderName);
    this.handleFolderBtn();
  };

  handleDeleteDocument = documentId => {
    this.props.deleteDocument(documentId);
  };

  pickDocument = () => {
    DocumentPicker.pick({
      type: [types.pdf, types.images],
    })
      .then(result => {
        if (result.length > 0) {
          this.setState({file: result});
          const formdata = new FormData();
          formdata.append('File', {
            uri: result[0].uri,
            type: result[0].type,
            name: result[0].name,
          });
          formdata.append('FolderPath', '/');
          formdata.append('FileName', result[0].name);

          this.props.uploadDocument(formdata);
        }
      })
      .catch(e => console.log(e));
  };

  renderItem = ({item}) => (
    <DocCard
      icon={item.documentType == 'file' ? images.file : images.folder}
      title={item.documentName}
      onPress={() => this.handleEvent(item)}
      onDelete={() => this.handleDeleteDocument(item.id)}
    />
  );

  render() {
    const {isVisible, documents, folderName} = this.state;
    const {loading} = this.props;
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
            data={documents}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
          />
          <FloatingActionButton
            onLeftPress={this.handleFolderBtn}
            onRightPress={this.pickDocument}
          />
        </View>
        <DocAlert
          visible={isVisible}
          title={str.createFolder}
          value={folderName}
          onChangeText={e => this.setState({folderName: e})}
          onCreate={this.handleCreateFolder}
          onCancel={this.handleFolderBtn}
        />
        <Spinner visible={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {loading, error, documents, folder, file, isDelete} = state.document;

  return {
    loading,
    error,
    documents,
    folder,
    file,
    isDelete,
  };
};

const mapStateToDispatch = {
  getDocuments,
  createFolder,
  uploadDocument,
  deleteDocument,
};

export default connect(mapStateToProps, mapStateToDispatch)(MyDocuments);
