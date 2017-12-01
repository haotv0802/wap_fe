import {combineReducers} from 'redux';
import crawledData from './crawledDataReducer';
import courses from './courseReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  crawledData,
  courses,
  ajaxCallsInProgress
});
export default rootReducer;
