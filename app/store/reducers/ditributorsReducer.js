import {types} from '../types';

const initialState = {
  distributors: null,
  loading: false,
  error: null,
};

const distributorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DISTRIBUTOS_REQUEST:
      return {...state, loading: true, error: null};
    case types.FETCH_DISTRIBUTOS_SUCCESS:
      return {...state, loading: false, distributors: action.payload};
    case types.FETCH_DISTRIBUTOS_FAILURE:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default distributorsReducer;
