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
        console.log("resp: ");
        console.log(resp);
        dispatch(loginSuccess(credentials));
        toastr.success("Login success!");
      }
    ).catch(
      error => {
        toastr.error("Username or password is incorrect!");
        throw (error);
      }
    );
    // if (credentials.email === "haoho" && credentials.password === "123") {
    //   dispatch(loginSuccess(credentials));
    //   toastr.success("Login success!");
    // } else {
    //   dispatch(ajaxCallError());
    //   toastr.error("Username or password is incorrect!");
    // }
  };
}
