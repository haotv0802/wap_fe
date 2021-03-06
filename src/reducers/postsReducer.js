import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function postsReducer(state = initialState.post, action) {
  switch(action.type) {
    case types.GET_POSTS_REPORT_BY_MONTH_SUCCESS:
      return Object.assign({}, state, {reportByMonth: action.reportByMonth});
    case types.GET_POSTS_REPORT_BY_DATE_SUCCESS:
      return Object.assign({}, state, {reportByDate: action.reportByDate});
    case types.GET_POSTS_COUNT_SUCCESS:
      return Object.assign({}, state, {count: action.count});
    case types.GET_POSTS_BY_CONTACT_ID_SUCCESS:
      return Object.assign({}, state, {data: action.data});
    default:
      return state;
  }
}
