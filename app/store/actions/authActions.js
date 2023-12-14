import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {BASEURL, endpoints} from '../../common/utils';
import {showMessage} from 'react-native-flash-message';
import {strings as str} from '../../common/strings';

export const userLogin = (rut, password) => async dispatch => {
  dispatch({type: types.LOGIN_REQUEST});
  const data = {rut, password};

  fetch(BASEURL + endpoints.login, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(respJson => respJson.json())
    .then(async resp => {
      if (resp.status == 'success') {
        showMessage({message: resp.message, icon: 'success', type: 'success'});
        storeAuthToken(resp.data.token);
        await AsyncStorage.setItem('AUTH_TOKEN', resp.data.token);
      } else {
        showMessage({message: resp.message, icon: 'danger', type: 'danger'});
      }
      dispatch({type: types.LOGIN_SUCCESS, payload: resp});
    })
    .catch(error => dispatch({type: types.LOGIN_FAILURE, payload: error}));
  return;
  try {
    const resp = await login(rut, password);
    console.log(resp);
    if (resp.status == 'success') {
      showMessage({message: resp.message, icon: 'success', type: 'success'});
      storeAuthToken(resp.data.token);
      await AsyncStorage.setItem('AUTH_TOKEN', resp.data.token);
    }
    dispatch({type: types.LOGIN_SUCCESS, payload: resp});
  } catch (error) {
    console.log(error);
    dispatch({type: types.LOGIN_FAILURE, payload: error});
  }
};

export const storeAuthToken = token => ({
  type: types.STORE_AUTH_TOKEN,
  payload: token,
});

export const userRegistration = data => async dispatch => {
  dispatch({type: types.REGISTER_REQUEST});

  fetch(BASEURL + endpoints.register, {
    method: 'POST',
    body: data,
  })
    .then(respJson => respJson.json())
    .then(resp => {
      if (resp.status == 'error') {
        showMessage({message: resp.message, icon: 'warning'});
      } else if (resp.status == 400) {
        showMessage({
          message: str.passValidation,
          icon: 'warning',
          duration: 5000,
        });
      }
      dispatch({type: types.REGISTER_SUCCESS, payload: resp});
    })
    .catch(error => {
      console.log(error);
      dispatch({type: types.REGISTER_FAILURE, payload: error});
    });
};

export const registerRejected = data => async dispatch => {
  dispatch({type: types.REGISTER_REJECTED_REQUEST});

  fetch(BASEURL + endpoints.register, {
    method: 'POST',
    body: data,
  })
    .then(respJson => respJson.json())
    .then(resp => {
      console.log(resp);
      dispatch({type: types.REGISTER_REJECTED_SUCCESS, payload: data});
    })
    .catch(error => {
      dispatch({type: types.RECOVER_PASSWORD_FAILURE, payload: error});
    });
  return;
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

export const updateProfile = data => async dispatch => {
  dispatch({type: types.UPDATE_PROFILE_REQUEST});

  try {
    const resp = await update_profile(data);
    console.log(resp);
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
