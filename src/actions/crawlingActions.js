import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';
import {getCrawledDataSuccess} from "./crawledDataActions";

export function getURLListSuccess(sites) {
  return {type: types.CRAWLING_URL_SUCCESS, sites};
}

export function getURLList() {
  console.log("------------getURLList");
  return dispatch => {
    dispatch(beginAjaxCall());
    dispatch(getURLListSuccess(
      {sites: ['https://batdongsan.com.vn/ban-nha-rieng123' + new Date(), 'https://batdongsan.com.vn/ban-can-ho-chung-cu123']}
      ));
  };
}

export function getCitiesSuccess(cities) {
  return {type: types.CRAWLING_CITIES_SUCCESS, cities};
}

export function getCities() {
  console.log("------------getCities");
  return dispatch => {
    dispatch(beginAjaxCall());
    dispatch(getURLListSuccess(
      {cities: ['Ho Chi Minh' + new Date(), 'Ha Noi']}
    ));
  };
}
