import {Linking, Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {types} from '../types';
import {
  maintenance_certificate,
  maintenance_urls,
  post_sale,
  post_sale_reasons,
  warranty_manual,
} from '../services/Api';
import {BASEURL, endpoints} from '../../common/utils';
import ts from '../../common/translate';

export const getMaintenanceUrls = () => async dispatch => {
  dispatch({type: types.FETCH_MAINTENANCE_URLS_REQUEST});

  try {
    const resp = await maintenance_urls();
    dispatch({type: types.FETCH_MAINTENANCE_URLS_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.FETCH_MAINTENANCE_URLS_DELETE, payload: error});
  }
};

export const getMaintenanceCertificate = vin => async dispatch => {
  dispatch({type: types.MAINTENANCE_CERTIFICATE_REQUEST});

  try {
    const resp = await maintenance_certificate(vin);
    if (resp.respInfo.status === 200) {
      ts('PDF downloaded successfully', 'success');
      Platform.select({
        ios: ReactNativeBlobUtil.ios.openDocument(resp.path()),
        android: ReactNativeBlobUtil.android.actionViewIntent(
          resp.path(),
          'application/pdf',
        ),
      });
    } else {
      ts('Failed to download PDF', 'danger');
    }
    dispatch({type: types.MAINTENANCE_CERTIFICATE_SUCCESS, payload: resp});
  } catch (error) {
    ts('Failed to download PDF', 'danger');
    dispatch({type: types.MAINTENANCE_CERTIFICATE_FAILURE, payload: error});
  }
};

export const requestPostSale =
  (reason, distributorId, query) => async dispatch => {
    dispatch({type: types.POST_SALE_REQUEST});

    try {
      const resp = await post_sale(reason, distributorId, query);
      dispatch({type: types.POST_SALE_SUCCESS, payload: resp});
    } catch (error) {
      dispatch({type: types.POST_SALE_FAILURE, payload: error});
    }
  };

export const getWarrantyManual = () => async dispatch => {
  dispatch({type: types.WARRANTY_MANUAL_REQUEST});

  try {
    const resp = await warranty_manual();
    dispatch({type: types.WARRANTY_MANUAL_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.WARRANTY_MANUAL_FAILURE, payload: error});
  }
};

export const getPostSaleReasons = () => async dispatch => {
  dispatch({type: types.POST_SALE_REASONS_REQUEST});

  try {
    const resp = await post_sale_reasons();
    dispatch({type: types.POST_SALE_REASONS_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.POST_SALE_REASONS_FAILURE, payload: error});
  }
};

export const getNews = () => async dispatch => {
  const token = await AsyncStorage.getItem('authToken');
  dispatch({type: types.FETCH_NEWS_REQUEST});

  fetch(BASEURL + endpoints.news, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(responseJson => responseJson.json())
    .then(resp => {
      if(resp.status == 401) {
        const url = 'myapp://Login';
        Linking.emit('url', {url});
      }
      dispatch({type: types.FETCH_NEWS_SUCCESS, payload: resp});
    })
    .catch(error => dispatch({type: types.FETCH_NEWS_FAILURE, payload: error}));
};