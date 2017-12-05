import {combineReducers} from 'redux';
import crawledData from './crawledDataReducer';
import login from './loginReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  crawledData,
  login,
  ajaxCallsInProgress
});
export default rootReducer;
