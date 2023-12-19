import {types} from '../types';

const initialState = {
  urls: null,
  postSale: null,
  postSaleReasons: null,
  warrantyManual: null,
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

    // Post Sale
    case types.POST_SALE_REQUEST:
      return {...state, loading: true, error: null};
    case types.POST_SALE_SUCCESS:
      return {...state, loading: false, postSale: action.payload};
    case types.POST_SALE_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Post Sale Reasons
    case types.POST_SALE_REASONS_REQUEST:
      return {...state, loading: true, error: null};
    case types.POST_SALE_REASONS_SUCCESS:
      return {...state, loading: false, postSaleReasons: action.payload};
    case types.POST_SALE_REASONS_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Get Warranty Manual
    case types.WARRANTY_MANUAL_REQUEST:
      return {...state, loading: true, error: null};
    case types.WARRANTY_MANUAL_SUCCESS:
      return {...state, loading: false, warrantyManual: action.payload};
    case types.WARRANTY_MANUAL_FAILURE:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
export default maintenanceReducer;
