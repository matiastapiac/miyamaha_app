import {types} from '../types';
import {
  fetch_news,
  maintenance_certificate,
  maintenance_urls,
  post_sale,
  post_sale_reasons,
  warranty_manual,
} from '../services/Api';
import {showMessage} from 'react-native-flash-message';
import ReactNativeBlobUtil from 'react-native-blob-util';

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
      showMessage({
        message: 'PDF downloaded successfully',
        type: 'success',
        icon: 'success',
      });
      ReactNativeBlobUtil.android.actionViewIntent(
        resp.path(),
        'application/pdf',
      );
    } else {
      showMessage({
        message: 'Failed to download PDF',
        type: 'danger',
        icon: 'danger',
      });
    }
    dispatch({type: types.MAINTENANCE_CERTIFICATE_SUCCESS, payload: resp});
  } catch (error) {
    showMessage({
      message: 'Failed to download PDF',
      type: 'danger',
      icon: 'danger',
    });
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
  dispatch({type: types.FETCH_NEWS_REQUEST});

  try {
    const resp = await fetch_news();
    dispatch({type: types.FETCH_NEWS_SUCCESS, payload: resp});
  } catch (error) {
    dispatch({type: types.FETCH_NEWS_FAILURE, payload: error});
  }
};
