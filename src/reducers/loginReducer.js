import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.credentials, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, action.credentials);
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, action.credentials);
    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, action.credentials);
    default:
      return state;
  }
}
