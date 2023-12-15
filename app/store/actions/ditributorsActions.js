import {get_distributors} from '../services/Api';
import {types} from '../types';

export const fetchDistributors = () => async dispatch => {
  dispatch({type: types.FETCH_DISTRIBUTOS_REQUEST});

  try {
    const resp = await get_distributors();
    dispatch({type: types.FETCH_DISTRIBUTOS_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.FETCH_DISTRIBUTOS_FAILURE, payload: error});
  }
};
