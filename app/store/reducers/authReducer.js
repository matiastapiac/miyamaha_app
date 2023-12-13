import {types} from '../types';

const initialState = {
  login: null,
  profile: null,
  updateProfile: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login Reducer
    case types.LOGIN_REQUEST:
      return {...state, loading: true, error: null};
    case types.LOGIN_SUCCESS:
      return {...state, loading: false, login: action.payload};
    case types.LOGIN_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Signup Reducer
    case types.REGISTER_REQUEST:
      return {...state, loading: true, error: null};
    case types.REGISTER_SUCCESS:
      return {...state, loading: false, user: action.payload};
    case types.REGISTER_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Forgot Password Reducer
    case types.FORGOT_PASSWORD_REQUEST:
      return {...state, loading: true, error: null};
    case types.FORGOT_PASSWORD_SUCCESS:
      return {...state, loading: false, user: action.payload};
    case types.FORGOT_PASSWORD_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Get User Profile
    case types.FETCH_PROFILE_REQUEST:
      return {...state, loading: true, error: null};
    case types.FETCH_PROFILE_SUCCESS:
      return {...state, loading: false, profile: action.payload};
    case types.FETCH_PROFILE_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Update User Profile
    case types.UPDATE_PROFILE_REQUEST:
      return {...state, loading: true, error: null};
    case types.UPDATE_PROFILE_SUCCESS:
      return {...state, loading: false, updateProfile: action.payload};
    case types.UPDATE_PROFILE_FAILURE:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default authReducer;
