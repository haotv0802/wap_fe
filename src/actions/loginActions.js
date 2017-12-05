import * as types from './actionTypes';
import loginApi from '../api/mockLoginApi';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';

export function loginSuccess(data) {
  return {type: types.LOGIN_SUCCESS, data};
}

export function login() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return loginApi.login (
      res => {
        setTimeout(() =>{
          dispatch(loginSuccess(res.data));
          toastr.success("Login success!");
        }, 3000);
      }
    ).catch(
      error => {
        dispatch(ajaxCallError(error));
        throw(error);
      }
    );
  };
}
