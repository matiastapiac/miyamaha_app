import {types} from '../types';
import {
  create_folder,
  delete_document,
  document_types,
  get_documents,
  lost_documents,
  upload_document,
} from '../services/Api';
import {showMessage} from 'react-native-flash-message';

export const getDocuments = () => async dispatch => {
  dispatch({type: types.FETCH_DOCUMENTS_REQUEST});

  try {
    const resp = await get_documents();
    dispatch({type: types.FETCH_DOCUMENTS_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.FETCH_DOCUMENTS_FAILURE, payload: error});
  }
};

export const getDocumentTypes = () => async dispatch => {
  dispatch({type: types.DOCUMENT_TYPES_REQUEST});

  try {
    const resp = await document_types();
    dispatch({type: types.DOCUMENT_TYPES_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.DOCUMENT_TYPES_FAILURE, payload: error});
  }
};

export const uploadDocument = data => async dispatch => {
  dispatch({type: types.UPLOAD_DOCUMENT_REQUEST});

  try {
    const resp = await upload_document(data);
    if (resp.status == 'success') {
      showMessage({message: resp.message, icon: 'success', type: 'success'});
    }
    dispatch({type: types.UPLOAD_DOCUMENT_SUCCESS, payload: resp});
  } catch (error) {
    console.log(error);
    dispatch({type: types.UPLOAD_DOCUMENT_FAILURE, payload: error});
  }
};

export const deleteDocument = documentId => async dispatch => {
  dispatch({type: types.DELETE_DOCUMENT_REQUEST});

  try {
    const resp = await delete_document(documentId);
    if (resp.status == 'success') {
      showMessage({message: resp.message, icon: 'success', type: 'success'});
    }
    dispatch({type: types.DELETE_DOCUMENT_SUCCESS, payload: resp});
  } catch (error) {
    showMessage({message: 'Folder not empty.', icon: 'danger', type: 'danger'});
    dispatch({type: types.DELETE_DOCUMENT_FAILURE, payload: error});
  }
};

export const createFolder = (folderPath, folderName) => async dispatch => {
  dispatch({type: types.CREATE_FOLDER_REQUEST});

  try {
    const resp = await create_folder(folderPath, folderName);
    if (resp.status == 'success') {
      showMessage({message: resp.message, type: 'success', icon: 'success'});
    }
    dispatch({type: types.CREATE_FOLDER_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.CREATE_FOLDER_FAILURE, payload: error});
  }
};

export const lostDocumentRequest =
  (typeDocument, distributorId) => async dispatch => {
    dispatch({type: types.LOST_DOCUMENTS_REQUEST});

    try {
      const resp = await lost_documents(typeDocument, distributorId);
      if (resp.status == 'success') {
        showMessage({message: resp.message, type: 'success', icon: 'success'});
      }
      dispatch({type: types.LOST_DOCUMENTS_SUCCESS, payload: resp});
    } catch (error) {
      dispatch({type: types.LOST_DOCUMENTS_FAILURE, payload: error});
    }
  };
