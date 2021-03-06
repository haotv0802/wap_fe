import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';
import crawledDataApi from "../api/crawledDataApi";

export function getCrawledDataSuccess(posts) {
  return {type: types.CRAWLED_DATA_SUCCESS, posts};
}

export function getCrawledData(pageNumber, pageSize) {
  return dispatch => {
    dispatch(beginAjaxCall());
    crawledDataApi.getCrawledData(pageNumber, pageSize).then (
      resp => {
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

export function getCitiesAndDistrictSuccess(citiesAndDistricts) {
  return {type: types.CITIES_DISTRICTS_SUCCESS, citiesAndDistricts};
}

export function getCitiesAndDistrict() {
  return dispatch => {
    dispatch(beginAjaxCall());
    crawledDataApi.getCitiesAndDistrict().then (
      resp => {
        dispatch(getCitiesAndDistrictSuccess(resp.data));
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        toastr.error("Failed loading cities and districts.");
        throw (error);
      }
    );
  };
}
