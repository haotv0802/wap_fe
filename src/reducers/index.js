import {combineReducers} from 'redux';
import credentials from './loginReducer';
import crawledData from './crawledDataReducer';
import crawlingInfo from './crawlingReducer';
import signupUser from './signupReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  credentials,
  signupUser,
  crawledData,
  crawlingInfo,
  ajaxCallsInProgress
});
export default rootReducer;
