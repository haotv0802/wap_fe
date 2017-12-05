import * as types from './actionTypes';
import loginApi from '../api/mockLoginApi';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';

export function loginSuccess(credentials) {
  return {type: types.LOGIN_SUCCESS, credentials};
}

export function login(credentials) {
  return dispatch => {
    dispatch(beginAjaxCall());
    if (credentials.email === "andrea") {
      dispatch(loginSuccess(credentials));
      toastr.success("Login success!");
    } else {
      dispatch(ajaxCallError());
      toastr.error("Username or password is incorrect!");
    }
  };
}
