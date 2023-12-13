import {types} from '../types';

const initialState = {
  documents: null,
  isLoading: false,
  error: null,
};

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Documents
    case types.FETCH_DOCUMENTS_REQUEST:
      return {...state, isLoading: true, error: null};
    case types.FETCH_DOCUMENTS_SUCCESS:
      return {...state, isLoading: false, documents: action.payload};
    case types.FETCH_DOCUMENTS_FAILURE:
      return {...state, isLoading: false, error: action.payload};

    // Upload Document
    case types.UPLOAD_DOCUMENT_REQUEST:
      return {...state, isLoading: true, error: null};
    case types.UPLOAD_DOCUMENT_SUCCESS:
      return {...state, isLoading: false, documents: action.payload};
    case types.UPLOAD_DOCUMENT_FAILURE:
      return {...state, isLoading: false, error: action.payload};

    // Delete Document
    case types.DELETE_DOCUMENT_REQUEST:
      return {...state, isLoading: true, error: null};
    case types.DELETE_DOCUMENT_SUCCESS:
      return {...state, isLoading: false, documents: action.payload};
    case types.DELETE_DOCUMENT_FAILURE:
      return {...state, isLoading: false, error: action.payload};

    default:
      return state;
  }
};

export default documentReducer;
