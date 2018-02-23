import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';
import crawledDataApi from "../api/crawledDataApi";

export function getCrawledDataSuccess(crawledData) {
  return {type: types.CRAWLING_URL_SUCCESS, crawledData};
}

export function getCrawledData() {
  return dispatch => {
    dispatch(beginAjaxCall());
    crawledDataApi.getCrawledData().then (
      resp => {
        console.log("Response from getCrawledData:");
        console.log(resp);
        dispatch(getCrawledDataSuccess(resp.data));
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

export function getURLListSuccess() {
  return {type: types.CRAWLING_URL_SUCCESS};
}

export function getURLList() {
  return dispatch => {
    dispatch(beginAjaxCall());
  };
}
