import {types} from '../types';

const initialState = {
  login: null,
  authToken: null,
  register: null,
  profile: null,
  updateProfile: null,
  forgotpass: null,
  changepass: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //Store Authentication Token
    case types.STORE_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };

    case types.LOAD_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };

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
      return {...state, loading: false, register: action.payload};
    case types.REGISTER_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Forgot Password Reducer
    case types.FORGOT_PASSWORD_REQUEST:
      return {...state, loading: true, error: null};
    case types.FORGOT_PASSWORD_SUCCESS:
      return {...state, loading: false, forgotpass: action.payload};
    case types.FORGOT_PASSWORD_FAILURE:
      return {...state, loading: false, error: action.payload};

    // Change Password Reducer
    case types.CHANGE_PASSWORD_REQUEST:
      return {...state, loading: true, error: null};
    case types.CHANGE_PASSWORD_SUCCESS:
      return {...state, loading: false, changepass: action.payload};
    case types.CHANGE_PASSWORD_FAILURE:
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
