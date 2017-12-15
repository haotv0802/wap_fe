import * as types from './actionTypes';
import loginApi from '../api/loginApi';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';

export function loginSuccess(credentials) {
  return {type: types.LOGIN_SUCCESS, credentials};
}

export function login(credentials) {
  return dispatch => {
    dispatch(beginAjaxCall());
    loginApi.login(credentials).then (
      resp => {
        credentials.isAuthorized = true;
        dispatch(loginSuccess(credentials));
        toastr.success("Login success!");
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        credentials.isAuthorized = false;
        toastr.error("Username or password is incorrect!");
        throw (error);
      }
    );
  };
}
