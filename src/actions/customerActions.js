import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";
import toastr from 'toastr';
import customerApi from "../api/customerApi";

export function getCustomersSuccess(data) {
  return {type: types.GET_CUSTOMER_LIST_SUCCESS, data};
}

export function updateCustomersSuccess(data) {
  return {type: types.UPDATE_CUSTOMER_LIST_SUCCESS, data};
}

export function updateCustomersFailure() {
  return {type: types.UPDATE_CUSTOMER_LIST_FAILURE};
}

export function deleteCustomersSuccess(data) {
  return {type: types.DELETE_CUSTOMERS_LIST_SUCCESS, data};
}

export function addCustomersSuccess(data) {
  return {type: types.ADD_CUSTOMER_SUCCESS, data};
}

export function addCustomersError() {
  return {type: types.ADD_CUSTOMER_ERROR};
}

export function getCustomers(name, phone, email, pageNumber, pageSize) {
  return dispatch => {
    dispatch(beginAjaxCall());
    customerApi.getCustomers(name, phone, email, pageNumber, pageSize).then (
      resp => {
        dispatch(getCustomersSuccess(resp.data));
        toastr.clear();
        // toastr.success("Data loaded successfully!");
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

export function updateCustomers(customers) {
  return dispatch => {
    dispatch(beginAjaxCall());
    customerApi.updateCustomers(customers).then (
      resp => {
        dispatch(updateCustomersSuccess(customers));
        toastr.success("Customers updated successfully!");
      }
    ).catch(
      error => {
        dispatch(updateCustomersFailure());
        dispatch(ajaxCallError());
        toastr.error(error.data.faultMessage);
        throw (error);
      }
    );
  };
}

export function deleteCustomers(customers, nameFilter, phoneFilter, emailFilter, pageNumber, pageSize) {
  return dispatch => {
    dispatch(beginAjaxCall());

    customerApi.deleteCustomers(customers).then (
      resp => {
        customerApi.getCustomers(nameFilter, phoneFilter, emailFilter, pageNumber, pageSize).then (
          resp => {
            dispatch(getCustomersSuccess(resp.data));
            toastr.success("Customers deleted successfully!");
          }
        ).catch(
          error => {
            dispatch(ajaxCallError());
            toastr.error("Failed loading customers.");
            throw (error);
          }
        );
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        toastr.error(error.data.faultMessage);
        throw (error);
      }
    );
  };
}

export function addCustomer(customer, nameFilter, phoneFilter, emailFilter, pageNumber, pageSize) {

  return dispatch => {
    dispatch(beginAjaxCall());
    customerApi.addCustomer(customer).then (
      resp => {
        customer.id = resp.data;
        dispatch(addCustomersSuccess(customer));
        toastr.success("Data added successfully!");
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        toastr.error(error.data.faultMessage);
        throw (error);
      }
    );
  };
}
