import {OneSignal} from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {types} from '../types';
import {
  update_profile,
  get_profile,
  recover_password,
  device_token,
  logout,
} from '../services/Api';
import {BASEURL, endpoints} from '../../common/utils';
import ts from '../../common/translate';
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
        ts(resp.message, 'success');
        await AsyncStorage.setItem('AUTH_TOKEN', resp.data.token);
      } else if (resp.status == 400) {
        ts(str.passValidation, 'danger');
      } else {
        ts(resp.message, 'danger');
      }
      dispatch({type: types.LOGIN_SUCCESS, payload: resp});
    })
    .catch(error => {
      dispatch({type: types.LOGIN_FAILURE, payload: error});
    });
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
        ts(resp.message, 'warning');
      } else if (resp.status == 400) {
        ts(resp.message, 'warning');
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
        ts(resp.message, 'danger');
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

// export const recoverPassword = (rut, code, password) => async dispatch => {
//   dispatch({type: types.RECOVER_PASSWORD_REQUEST});

//   try {
//     const resp = await recover_password(rut, code, password);
//     if (resp.status == 'success') {
//       ts(resp.message, 'success');
//     }
//     dispatch({type: types.RECOVER_PASSWORD_SUCCESS, payload: resp});
//   } catch (error) {
//     console.log(error);
//     ts(str.passValidation, 'warning');
//     dispatch({type: types.RECOVER_PASSWORD_FAILURE, payload: error});
//   }
// };


export const recoverPassword = (rut, recoveryCode, newPassword) => async dispatch => {
  const token = await AsyncStorage.getItem('authToken');
  dispatch({type: types.RECOVER_PASSWORD_REQUEST});

  fetch(BASEURL + endpoints.recover_password, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      rut,
      recoveryCode,
      newPassword,
    }),
  })
    .then(response => response.json())
    .then(resp => {
      console.log(resp);
      const status = resp.status;
      const message = resp.message || (resp.errors && Object.values(resp.errors)[0][0]);

      if (status === 'success') {
        ts(message, 'success');
        dispatch({type: types.RECOVER_PASSWORD_SUCCESS, payload: resp});
      } else {
        ts(message, status === 'error' ? 'danger' : 'warning');
        dispatch({type: types.RECOVER_PASSWORD_FAILURE, payload: resp});
      }
    })
    .catch(e => {
      dispatch({type: types.RECOVER_PASSWORD_FAILURE, payload: e});
    });
};

// export const changePassword = (password, newPassword) => async dispatch => {
//   const token = await AsyncStorage.getItem('authToken');
//   dispatch({type: types.CHANGE_PASSWORD_REQUEST});

//   fetch(BASEURL + endpoints.change_password, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       password,
//       newPassword,
//     }),
//   })
//     .then(response => response.json())
//     .then(resp => {
//       console.log(resp);
//       if (resp.status == 'success') {
//         ts(resp.message, 'success');
//       } else if (resp.status == 'error') {
//         ts(resp.message, 'danger');
//       } else if (resp.status == 400) {
//         if (resp.message) {
//           ts(resp.message, 'warning');
//         } else if (resp.errors.Password) {
//           ts(resp.errors.Password[0], 'warning');
//         } else if (resp.errors.NewPassword) {
//           ts(resp.errors.NewPassword[0], 'warning');
//         }
//       } else {
//         ts(resp.message, 'warning');
//       }
//       dispatch({type: types.REGISTER_SUCCESS, payload: resp});
//     })
//     .catch(e => {
//       dispatch({type: types.CHANGE_PASSWORD_FAILURE, payload: error});
//     });
// };

export const changePassword = (password, newPassword) => async dispatch => {
  const token = await AsyncStorage.getItem('authToken');
  dispatch({type: types.CHANGE_PASSWORD_REQUEST});

  fetch(BASEURL + endpoints.change_password, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password,
      newPassword,
    }),
  })
    .then(response => response.json())
    .then(resp => {
      console.log(resp);
      const status = resp.status;
      const message = resp.message || (resp.errors && Object.values(resp.errors)[0][0]);

      if (status === 'success') {
        ts(message, 'success');
        dispatch({type: types.CHANGE_PASSWORD_SUCCESS, payload: resp});
      } else {
        ts(message, status === 'error' ? 'danger' : 'warning');
        dispatch({type: types.CHANGE_PASSWORD_FAILURE, payload: resp});
      }
    })
    .catch(e => {
      dispatch({type: types.CHANGE_PASSWORD_FAILURE, payload: e});
    });
};

export const updateProfile = data => async dispatch => {
  dispatch({type: types.UPDATE_PROFILE_REQUEST});

  try {
    const resp = await update_profile(data);
    if (resp.status == 'success') {
      ts(resp.message, 'success');
    }
    dispatch({type: types.UPDATE_PROFILE_SUCCESS, payload: resp});
  } catch (error) {
    ts('Los campos no pueden estar vacíos', 'danger');
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
      OneSignal.User.addAlias('external_user_id', id);
      OneSignal.login(id);
    }
    dispatch({type: types.DEVICE_TOKEN_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.DEVICE_TOKEN_FAILURE, payload: error});
  }
};

export const userLogout = () => async dispatch => {
  dispatch({type: types.LOGOUT_REQUEST});

  try {
    const resp = await logout();
    if (resp.status == 'success') {
      ts(resp.message, 'success');
    }
    dispatch({type: types.LOGOUT_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.LOGOUT_FAILURE, payload: error});
  }
};
