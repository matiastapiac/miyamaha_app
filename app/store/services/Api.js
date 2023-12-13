import axios from 'axios';
import {BASEURL, endpoints} from '../../common/utils';

const instance = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fmInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export function setTokenHeader(token) {
  if (token !== undefined) {
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

export function forgot_password(rut) {
  const data = {
    rut,
  };
  return instance
    .post(endpoints.forgot_password, data)
    .then(response => response.data);
}

export function register(rut, vin, password) {
  const formdata = new FormData();
  formdata.append('rut', rut);
  formdata.append('vin', vin);
  formdata.append('password', password);

  return fmInstance
    .post(endpoints.register, formdata)
    .then(response => response.data);
}

export function register_rejected(data) {
  const formdata = new FormData();
  formdata.append('rut', data.rut);
  formdata.append('vin', data.vin);
  formdata.append('firstName', data.firstName);
  formdata.append('lastName', data.lastName);
  formdata.append('newMotorcycle', data.newMotorcycle);
  formdata.append('email', data.email);
  formdata.append('phone', data.phone);
  formdata.append('address', data.address);
  formdata.append('commune', data.commune);
  formdata.append('region', data.region);
  formdata.append('File', data.file);
  formdata.append('distributorId', data.distributorId);

  return fmInstance
    .post(endpoints.register, formdata)
    .then(response => response.data);
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

export function update_profile(data) {
  return instance
    .post(endpoints.register, data)
    .then(response => response.data);
}

export function get_profile() {
  return instance.get(endpoints.profile).then(response => response.data);
}

export function recover_password(rut, recoveryCode, newPassword) {
  const data = {
    rut,
    recoveryCode,
    newPassword,
  };
  return instance
    .post(endpoints.recover_password, data)
    .then(response => response.data);
}

export function change_password(password, newPassword) {
  const data = {
    password,
    newPassword,
  };
  return instance
    .post(endpoints.change_password, data)
    .then(response => response.data);
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
  return instance.get(endpoints.documnets).then(response => response.data);
}

export function upload_document() {
  const data = new FormData();
  return fmInstance
    .post(endpoints.documnets, data)
    .then(response => response.data);
}

export function create_folder() {
  const data = {};
  return instance.post(endpoints.folders, data).then(response => response.data);
}

export function delete_document(documentId) {
  return instance
    .delete(endpoints.documnets + `/${documentId}`)
    .then(response => response.data);
}

export function fetch_news() {
  return instance.get(endpoints.news).then(response => response.data);
}
