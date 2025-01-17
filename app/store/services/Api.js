import {Linking, Platform} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {BASEURL, endpoints} from '../../common/utils';

global.Buffer = require('buffer').Buffer;

export const instance = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fmInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

function handleError(error) {
  if (error.response.status == 401) {
    const url = 'myapp://Login';
    Linking.emit('url', {url});
  }
}

export async function setTokenHeader(token) {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fmInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export function login(rut, password) {
  const data = {
    rut,
    password,
  };
  return instance.post(endpoints.login, data).then(response => response.data);
}

export function request_newMotorcycle(data) {
  const formdata = new FormData();
  formdata.append('rut', data.rut);
  formdata.append('vin', data.vin);
  formdata.append('newMotorcycle', data.newMotorcycle);
  formdata.append('email', data.email);

  return instance
    .post(endpoints.register, formdata)
    .then(response => response.data);
}

export function forgot_password(rut) {
  const data = {
    rut,
  };
  return instance
    .post(endpoints.forgot_password, data)
    .then(response => response.data);
}

export function recover_password(rut, recoveryCode, newPassword) {
  const data = {
    rut,
    recoveryCode,
    newPassword,
  };
  return instance
    .put(endpoints.recover_password, data)
    .then(response => response.data);
}

export function change_password(password, newPassword) {
  const data = {
    password,
    newPassword,
  };
  return instance
    .put(endpoints.change_password, data)
    .then(response => response.data);
}

export function update_profile(data) {
  return instance.post(endpoints.profile, data).then(response => response.data);
}

export function get_profile() {
  return instance
    .get(endpoints.profile)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function device_token(playerId) {
  const data = {
    playerId,
  };
  return instance
    .post(endpoints.device_token, data)
    .then(response => response.data);
}

export function get_documents() {
  return instance
    .get(endpoints.documents)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function document_types() {
  return instance
    .get(endpoints.document_types)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function upload_document(data) {
  return fmInstance
    .post(endpoints.documents, data)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function create_folder(folderPath, folderName) {
  const data = {
    folderPath,
    folderName,
  };
  return instance
    .post(endpoints.folders, data)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function delete_document(documentId) {
  return instance
    .delete(endpoints.documents + `/${documentId}`)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function lost_documents(typeDocument, distributorId) {
  const data = {
    typeDocument,
    distributorId,
  };
  return instance
    .post(endpoints.lost_documents, data)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function fetch_news() {
  return instance
    .get(endpoints.news)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function get_distributors() {
  return instance
    .get(endpoints.distributors)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function maintenance_urls() {
  return instance
    .get(endpoints.maintenance_urls)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export async function maintenance_certificate(vin) {
  const token = await AsyncStorage.getItem('authToken');
  const path = Platform.select({
    ios: ReactNativeBlobUtil.fs.dirs.DocumentDir,
    android: ReactNativeBlobUtil.fs.dirs.DownloadDir,
  });
  const response = await ReactNativeBlobUtil.config({
    fileCache: true,
    path: `${path}/maintenance_certificate.pdf`,
  }).fetch('GET', `${BASEURL + endpoints.maintenance_certificate}/${vin}`, {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/pdf',
  });
  return response;
}

export function warranty_manual() {
  return instance
    .get(endpoints.warranty_manual)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function post_sale(reason, distributorId, query) {
  const data = {
    reason,
    distributorId,
    query,
  };
  return instance
    .post(endpoints.post_sale, data)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function post_sale_reasons() {
  return instance
    .get(endpoints.post_sale_reasons)
    .then(response => response.data)
    .catch(e => handleError(e));
}

export function logout() {
  return instance.post(endpoints.logout).then(response => response.data);
}
