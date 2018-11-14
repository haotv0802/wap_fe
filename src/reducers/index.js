import {combineReducers} from 'redux';
import credentials from './loginReducer';
import crawledData from './crawledDataReducer';
import contact from './contactReducer';
import post from './postsReducer';
import customer from './customerReducer';
import crawlingInfo from './crawlingReducer';
import signupUser from './signupReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  credentials,
  signupUser,
  contact,
  post,
  customer,
  crawledData,
  crawlingInfo,
  ajaxCallsInProgress
});
export default rootReducer;
