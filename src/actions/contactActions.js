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

export function getContacts(name, phone, email, type, manualCheck, emailExisting, pageNumber, pageSize, sortingMap) {
  return dispatch => {
    dispatch(beginAjaxCall());
    ContactApi.getContacts(name, phone, email, type, manualCheck, emailExisting, pageNumber, pageSize, sortingMap).then (
      resp => {
        dispatch(getContactsSuccess(resp.data));
        // toastr.clear();
        // toastr.success("Data loaded successfully!");
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        toastr.clear();
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
        toastr.clear();
        toastr.success("Contacts updated successfully!");
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        toastr.clear();
        toastr.error("Failed updating contacts");
        throw (error);
      }
    );
  };
}
