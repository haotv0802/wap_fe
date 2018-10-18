import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";
import toastr from 'toastr';
import customerApi from "../api/customerApi";

export function getContactsSuccess(data) {
  return {type: types.GET_CUSTOMER_LIST_SUCCESS, data};
}

export function updateContactsSuccess(data) {
  return {type: types.UPDATE_CUSTOMER_LIST_SUCCESS, data};
}

export function getCustomers(name, phone, email, pageNumber, pageSize) {
  return dispatch => {
    dispatch(beginAjaxCall());
    customerApi.getCustomers(name, phone, email, pageNumber, pageSize).then (
      resp => {
        dispatch(getContactsSuccess(resp.data));
        toastr.success("Data loaded successfully!");
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        toastr.error("Failed loading customers.");
        throw (error);
      }
    );
  };
}

export function updateContacts(customers) {
  return dispatch => {
    dispatch(beginAjaxCall());
    customerApi.updateCustomers(customers).then (
      resp => {
        dispatch(updateContactsSuccess(customers));
        toastr.success("Customers updated successfully!");
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        toastr.error("Failed updating customers");
        throw (error);
      }
    );
  };
}
