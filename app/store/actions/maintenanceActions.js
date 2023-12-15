import {types} from '../types';
import {maintenance_urls} from '../services/Api';

export const getMaintenanceUrls = () => async dispatch => {
  dispatch({type: types.FETCH_MAINTENANCE_URLS_REQUEST});

  try {
    const resp = await maintenance_urls();
    dispatch({type: types.FETCH_MAINTENANCE_URLS_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.FETCH_MAINTENANCE_URLS_DELETE, payload: error});
  }
};
