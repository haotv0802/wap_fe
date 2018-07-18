import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";
import toastr from 'toastr';
import ContactApi from "../api/contactApi";

export function getContactsSuccess(data) {
  return {type: types.GET_CONTACT_LIST_SUCCESS, data};
}

export function updateContactsSuccess(data) {
  return {type: types.UPDATE_CONTACT_LIST_SUCCESS, data};
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
        toastr.error("Failed loading contacts.");
        throw (error);
      }
    );
  };
}

export function updateContacts(contacts) {
  return dispatch => {
    dispatch(beginAjaxCall());
    ContactApi.updateContacts(contacts).then (
      resp => {
        dispatch(updateContactsSuccess(contacts));
        toastr.success("Contacts updated successfully!");
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        toastr.error("Failed updating contacts");
        throw (error);
      }
    );
  };
}
