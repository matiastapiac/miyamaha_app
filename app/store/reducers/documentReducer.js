import {types} from '../types';

const initialState = {
  documents: null,
  folder: null,
  file: null,
  delete: null,
  lost: null,
  loading: false,
  error: null,
};

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Documents
    case types.FETCH_DOCUMENTS_REQUEST:
      return {...state, loading: true, error: null};
    case types.FETCH_DOCUMENTS_SUCCESS:
      return {...state, loading: false, documents: action.payload};
    case types.FETCH_DOCUMENTS_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Upload Document
    case types.UPLOAD_DOCUMENT_REQUEST:
      return {...state, loading: true, error: null};
    case types.UPLOAD_DOCUMENT_SUCCESS:
      return {...state, loading: false, file: action.payload};
    case types.UPLOAD_DOCUMENT_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Delete Document
    case types.DELETE_DOCUMENT_REQUEST:
      return {...state, loading: true, error: null};
    case types.DELETE_DOCUMENT_SUCCESS:
      return {...state, loading: false, delete: action.payload};
    case types.DELETE_DOCUMENT_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Create Folder
    case types.CREATE_FOLDER_REQUEST:
      return {...state, loading: true, error: null};
    case types.CREATE_FOLDER_SUCCESS:
      return {...state, loading: false, folder: action.payload};
    case types.CREATE_FOLDER_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Lost Documents Request
    case types.LOST_DOCUMENTS_REQUEST:
      return {...state, loading: true, error: null};
    case types.LOST_DOCUMENTS_SUCCESS:
      return {...state, loading: false, lost: action.payload};
    case types.LOST_DOCUMENTS_FAILURE:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default documentReducer;
