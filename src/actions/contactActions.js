import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";
import toastr from 'toastr';
import ContactApi from "../api/contactApi";

export function getContactsSuccess(contacts) {
  return {type: types.GET_CONTACT_LIST_SUCCESS, contacts};
}

export function getContacts() {
  return dispatch => {
    dispatch(beginAjaxCall());
    ContactApi.getContacts().then (
      resp => {
        dispatch(getContactsSuccess(resp.data));
        toastr.success("Data loaded successfully!");
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        toastr.error("Failed loading crawled data.");
        throw (error);
      }
    );
  };
}
