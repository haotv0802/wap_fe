import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';
import {getCrawledDataSuccess} from "./crawledDataActions";
import HttpClient from "../api/HttpClient";
import {LOGIN_URL} from "../api/constants";
import crawlingApi from '../api/crawlingApi';
import loginApi from "../api/loginApi";
import {loginFailure, loginSuccess} from "./loginActions";
import {browserHistory} from "react-router";

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

export function crawlDataSucess() {
  return {type: types.CRAWLING_DATA_SUCCESS};
}

export function crawlDataFailure() {
  return {type: types.CRAWLING_DATA_FAILURE};
}

export function crawlData(info) {
  return dispatch => {
    dispatch(beginAjaxCall());
    crawlingApi.crawlData(info).then (
      resp => {
        dispatch(crawlDataSucess());
        toastr.success("Crawling data success!");
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        dispatch(crawlDataFailure());
        toastr.error("Crawling data failed!");
        throw (error);
      }
    );
  };
}
