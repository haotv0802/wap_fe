import {combineReducers} from 'redux';
import credentials from './loginReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  credentials,
  ajaxCallsInProgress
});
export default rootReducer;
