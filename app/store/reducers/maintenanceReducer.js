import {types} from '../types';

const initialState = {
  urls: null,
  loading: false,
  error: null,
};

const maintenanceReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Maintenance Urls
    case types.FETCH_MAINTENANCE_URLS_REQUEST:
      return {...state, loading: true, error: null};
    case types.FETCH_MAINTENANCE_URLS_SUCCESS:
      return {...state, loading: false, urls: action.payload};
    case types.FETCH_MAINTENANCE_URLS_DELETE:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
  i;
};
export default maintenanceReducer;
