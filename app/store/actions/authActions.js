import {types} from '../types';
import {
  login,
  forgot_password,
  register,
  register_rejected,
  update_profile,
  get_profile,
  recover_password,
  change_password,
} from '../services/Api';

export const userLogin = (rut, password) => async dispatch => {
  dispatch({type: types.LOGIN_REQUEST});

  try {
    const resp = await login(rut, password);
    dispatch({type: types.LOGIN_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.LOGIN_FAILURE, payload: error});
  }
};

export const userRegistration = () => async dispatch => {
  dispatch({type: types.REGISTER_REQUEST});

  try {
    const data = await register();
    dispatch({type: types.REGISTER_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: types.REGISTER_FAILURE, payload: error});
  }
};

export const registerRejected = () => async dispatch => {
  dispatch({type: types.REGISTER_REJECTED_REQUEST});

  try {
    const data = await register_rejected();
    dispatch({type: types.REGISTER_REJECTED_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: types.RECOVER_PASSWORD_FAILURE, payload: error});
  }
};

export const forgotPassword = () => async dispatch => {
  dispatch({type: types.FORGOT_PASSWORD_REQUEST});

  try {
    const data = await forgot_password();
    dispatch({type: types.FORGOT_PASSWORD_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: types.FORGOT_PASSWORD_FAILURE, payload: error});
  }
};

export const recoverPassword = () => async dispatch => {
  dispatch({type: types.RECOVER_PASSWORD_REQUEST});

  try {
    const data = await recover_password();
    dispatch({type: types.RECOVER_PASSWORD_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: types.RECOVER_PASSWORD_FAILURE, payload: error});
  }
};

export const changePassword = () => async dispatch => {
  dispatch({type: types.CHANGE_PASSWORD_REQUEST});

  try {
    const data = await change_password();
    dispatch({type: types.CHANGE_PASSWORD_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: types.CHANGE_PASSWORD_FAILURE, payload: error});
  }
};

export const updateProfile = (data) => async dispatch => {
  dispatch({type: types.UPDATE_PROFILE_REQUEST});

  try {
    const resp = await update_profile(data);
    console.log(resp)
    dispatch({type: types.UPDATE_PROFILE_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.UPDATE_PROFILE_FAILURE, payload: error});
  }
};

export const fetchProfile = () => async dispatch => {
  dispatch({type: types.FETCH_PROFILE_REQUEST});

  try {
    const data = await get_profile();
    dispatch({type: types.FETCH_PROFILE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: types.FETCH_PROFILE_FAILURE, payload: error});
  }
};
