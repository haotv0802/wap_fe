import {combineReducers} from 'redux';
import crawledData from './crawledDataReducer';
import credentials from './loginReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  crawledData,
  credentials,
  ajaxCallsInProgress
});
export default rootReducer;
