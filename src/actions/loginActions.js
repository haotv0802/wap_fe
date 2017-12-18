import * as types from './actionTypes';
import loginApi from '../api/loginApi';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';
import { browserHistory } from 'react-router'

export function loginSuccess(credentials) {
  return {type: types.LOGIN_SUCCESS, credentials};
}

export function logoutSuccess(credentials) {
  return {type: types.LOGOUT_SUCCESS, credentials};
}

export function login(credentials) {
  return dispatch => {
    dispatch(beginAjaxCall());
    loginApi.login(credentials).then (
      resp => {
        credentials.isAuthorized = true;
        dispatch(loginSuccess(credentials));
        console.log(credentials);
        toastr.success("Login success!");
        browserHistory.push('/');
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

export function logout(credentials) {
  return dispatch => {
    dispatch(beginAjaxCall());
    credentials.isAuthorized = false;
    dispatch(logoutSuccess(credentials));
    toastr.success("Logout success!");
  };
}
