import {combineReducers} from 'redux';
import authReducer from './authReducer';
import documentReducer from './documentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  document: documentReducer,
});

export default rootReducer;
