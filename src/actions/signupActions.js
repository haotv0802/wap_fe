import * as types from './actionTypes';
import signupApi from '../api/signupApi';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';

export function signupSuccess(signupUser) {
  return {type: types.SIGNUP_SUCCESS, signupUser};
}

export function signupFailure(signupUser) {
  return {type: types.SIGNUP_FAILURE, signupUser};
}

export function signup(signupUser) {
  return dispatch => {
    dispatch(beginAjaxCall());
    signupApi.signup(signupUser).then (
      resp => {
        dispatch(signupSuccess(signupUser));
        toastr.success("Sign-up success!");
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        signupUser.serverError = {status: error.status, statusText: error.statusText};
        dispatch(signupFailure(signupUser));
        if (error.status === 403) {
          toastr.error("Username is already existing.");
        } else {
          toastr.error("Signup process unsuccessfully!");
        }
        throw (error);
      }
    );
  };
}
