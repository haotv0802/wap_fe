import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function signupReducer(state = initialState.signupUser, action) {
  switch(action.type) {
    case types.SIGNUP_SUCCESS:
      return Object.assign(...state, action.signupUser);
    default:
      return state;
  }
}