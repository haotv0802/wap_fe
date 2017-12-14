import {combineReducers} from 'redux';
import credentials from './loginReducer';
import signupUser from './signupReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  credentials,
  signupUser,
  ajaxCallsInProgress
});
export default rootReducer;
