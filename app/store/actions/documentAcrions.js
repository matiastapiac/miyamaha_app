import {types} from '../types';
import {delete_document, get_documents, upload_document} from '../services/Api';

export const getDocuments = () => async dispatch => {
  dispatch({type: types.FETCH_DOCUMENTS_REQUEST});

  try {
    const data = await get_documents();
    dispatch({type: types.FETCH_DOCUMENTS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: types.FETCH_DOCUMENTS_FAILURE, payload: error});
  }
};

export const uploadDocument = () => async dispatch => {
  dispatch({type: types.UPLOAD_DOCUMENT_REQUEST});

  try {
    const data = await upload_document();
    dispatch({type: types.UPLOAD_DOCUMENT_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: types.UPLOAD_DOCUMENT_FAILURE, payload: error});
  }
};

export const deleteDocument = () => async dispatch => {
  dispatch({type: types.DELETE_DOCUMENT_REQUEST});

  try {
    const data = await delete_document();
    dispatch({type: types.DELETE_DOCUMENT_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: types.DELETE_DOCUMENT_FAILURE, payload: error});
  }
};
