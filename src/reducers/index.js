import {combineReducers} from 'redux';
import credentials from './loginReducer';
import crawledData from './crawledDataReducer';
import signupUser from './signupReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  credentials,
  signupUser,
  crawledData,
  ajaxCallsInProgress
});
export default rootReducer;
