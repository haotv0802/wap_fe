import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.credentials, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      // return [...state, Object.assign({}, action.credentials)];
      //     return Object.assign({}, state, action.credentials);
    default:
      return state;
  }
}
