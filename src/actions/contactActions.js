import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";
import toastr from 'toastr';
import ContactApi from "../api/contactApi";

export function getContactsSuccess(data) {
  return {type: types.GET_CONTACT_LIST_SUCCESS, data};
}

export function getContacts(name, phone, email, type, manualCheck, emailExisting, pageNumber, pageSize) {
  return dispatch => {
    dispatch(beginAjaxCall());
    ContactApi.getContacts(name, phone, email, type, manualCheck, emailExisting, pageNumber, pageSize).then (
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
