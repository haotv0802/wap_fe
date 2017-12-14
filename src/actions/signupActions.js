import * as types from './actionTypes';
import signupApi from '../api/signupApi';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';

export function signupSuccess(signupUser) {
  return {type: types.SIGNUP_SUCCESS, signupUser};
}

export function signup(signupUser) {
  return dispatch => {
    dispatch(beginAjaxCall());
    signupApi.signup(signupUser).then (
      resp => {
        console.log("response: ");
        console.log(resp);
        dispatch(signupSuccess(signupUser));
        toastr.success("Sign-up success!");
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        toastr.error("Signup process unsuccessfully!");
        throw (error);
      }
    );
  };
}
