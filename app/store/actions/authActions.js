import {OneSignal} from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {types} from '../types';
import {
  update_profile,
  get_profile,
  recover_password,
  change_password,
  device_token,
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
        await AsyncStorage.setItem('AUTH_TOKEN', resp.data.token);
      } else {
        showMessage({message: resp.message, icon: 'danger', type: 'danger'});
      }
      dispatch({type: types.LOGIN_SUCCESS, payload: resp});
    })
    .catch(error => dispatch({type: types.LOGIN_FAILURE, payload: error}));
};

export const storeAuthToken = token => {
  return async dispatch => {
    try {
      await AsyncStorage.setItem('authToken', token);

      dispatch({
        type: types.STORE_AUTH_TOKEN,
        payload: token,
      });
    } catch (error) {}
  };
};

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

export const registerNewMotorcycle = data => async dispatch => {
  dispatch({type: types.REGISTER_NEW_MOTORCYCLE_REQUEST});

  fetch(BASEURL + endpoints.register_rejected_new_motorcycle, {
    method: 'POST',
    body: data,
  })
    .then(respJson => respJson.json())
    .then(resp => {
      if (resp.status == 'error') {
        showMessage({message: resp.message, icon: 'danger', type: 'danger'});
      }
      dispatch({type: types.REGISTER_NEW_MOTORCYCLE_SUCCESS, payload: resp});
    })
    .catch(error => {
      dispatch({type: types.REGISTER_NEW_MOTORCYCLE_FAILURE, payload: error});
    });
};

export const registerOldMotorcycle = data => async dispatch => {
  dispatch({type: types.REGISTER_OLD_MOTORCYCLE_REQUEST});

  fetch(BASEURL + endpoints.register_rejected_old_motorcycle, {
    method: 'POST',
    body: data,
  })
    .then(respJson => respJson.json())
    .then(resp => {
      console.log(resp);
      dispatch({type: types.REGISTER_OLD_MOTORCYCLE_SUCCESS, payload: resp});
    })
    .catch(error => {
      console.log(error);
      dispatch({type: types.REGISTER_OLD_MOTORCYCLE_FAILURE, payload: error});
    });
};

export const forgotPassword = rut => async dispatch => {
  dispatch({type: types.FORGOT_PASSWORD_REQUEST});

  fetch(BASEURL + endpoints.forgot_password, {
    method: 'POST',
    body: JSON.stringify({rut}),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(responseJson => responseJson.json())
    .then(resp => {
      dispatch({type: types.FORGOT_PASSWORD_SUCCESS, payload: resp});
    })
    .catch(error => {
      dispatch({type: types.FORGOT_PASSWORD_FAILURE, payload: error});
    });
};

export const recoverPassword = (rut, code, password) => async dispatch => {
  dispatch({type: types.RECOVER_PASSWORD_REQUEST});

  try {
    const resp = await recover_password(rut, code, password);
    if (resp.status == 'success') {
      showMessage({message: resp.message, icon: 'success', type: 'success'});
    }
    dispatch({type: types.RECOVER_PASSWORD_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.RECOVER_PASSWORD_FAILURE, payload: error});
  }
};

export const changePassword = () => async dispatch => {
  dispatch({type: types.CHANGE_PASSWORD_REQUEST});

  try {
    const resp = await change_password();
    dispatch({type: types.CHANGE_PASSWORD_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.CHANGE_PASSWORD_FAILURE, payload: error});
  }
};

export const updateProfile = data => async dispatch => {
  dispatch({type: types.UPDATE_PROFILE_REQUEST});

  try {
    const resp = await update_profile(data);
    if (resp.status == 'success') {
      showMessage({
        message: resp.message,
        type: 'success',
        icon: 'success',
      });
    }
    dispatch({type: types.UPDATE_PROFILE_SUCCESS, payload: resp});
  } catch (error) {
    showMessage({
      message: 'Los campos no pueden estar vacíos',
      type: 'danger',
      icon: 'danger',
    });
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

export const setDeviceToken = id => async dispatch => {
  dispatch({type: types.DEVICE_TOKEN_REQUEST});

  try {
    const resp = await device_token(id);
    if (resp.status == 'success') {
      OneSignal.User.addAlias('external_id', id);
    }
    dispatch({type: types.DEVICE_TOKEN_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.DEVICE_TOKEN_FAILURE, payload: error});
  }
};
