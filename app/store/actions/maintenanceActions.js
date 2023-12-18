import {types} from '../types';
import {maintenance_urls, post_sale, warranty_manual} from '../services/Api';

export const getMaintenanceUrls = () => async dispatch => {
  dispatch({type: types.FETCH_MAINTENANCE_URLS_REQUEST});

  try {
    const resp = await maintenance_urls();
    dispatch({type: types.FETCH_MAINTENANCE_URLS_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.FETCH_MAINTENANCE_URLS_DELETE, payload: error});
  }
};

export const requestPostSale =
  (reason, distributorId, query) => async dispatch => {
    dispatch({type: types.POST_SALE_REQUEST});

    try {
      const resp = await post_sale(reason, distributorId, query);
      dispatch({type: types.POST_SALE_SUCCESS, payload: resp});
    } catch (error) {
      dispatch({type: types.POST_SALE_FAILURE, payload: error});
    }
  };

export const getWarrantyManual = () => async dispatch => {
  dispatch({type: types.WARRANTY_MANUAL_REQUEST});

  try {
    const resp = await warranty_manual();
    dispatch({type: types.WARRANTY_MANUAL_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.WARRANTY_MANUAL_FAILURE, payload: error});
  }
};
