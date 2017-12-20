import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function signupReducer(state = initialState.signupUser, action) {
  switch(action.type) {
    case types.SIGNUP_SUCCESS:
      console.log("signup success");
      return Object.assign(...state, action.signupUser);
    case types.SIGNUP_FAILURE:
      console.log("signup failure");
      return Object.assign(...state, action.signupUser);
    default:
      return state;
  }
}
