import {combineReducers} from 'redux';
import authReducer from './authReducer';
import documentReducer from './documentReducer';
import distributorsReducer from './ditributorsReducer';
import maintenanceReducer from './maintenanceReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  document: documentReducer,
  distributors: distributorsReducer,
  maintenance: maintenanceReducer,
});

export default rootReducer;
