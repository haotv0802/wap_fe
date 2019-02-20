import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";
import postsApi from "../api/postsApi";

export function getPostsReportByMonthSuccess(reportByMonth) {
  return {type: types.GET_POSTS_REPORT_BY_MONTH_SUCCESS, reportByMonth};
}

export function getPostsReportByDateSuccess(reportByDate) {
  return {type: types.GET_POSTS_REPORT_BY_DATE_SUCCESS, reportByDate};
}

export function getPostsCountSuccess(count) {
  return {type: types.GET_POSTS_COUNT_SUCCESS, count};
}

export function getPostsByContactIdSuccess(data) {
  return {type: types.GET_POSTS_BY_CONTACT_ID_SUCCESS, data};
}

export function getPostsReportByMonth(startMonth, startYear, endMonth, endYear) {
  return dispatch => {
    dispatch(beginAjaxCall());
    postsApi.getPostsReportByMonth(startMonth, startYear, endMonth, endYear).then (
      resp => {
        console.log("=========== resp");
        console.log(resp);
        console.log("=========== resp <<<<<<<<< ");
        dispatch(getPostsReportByMonthSuccess(resp.data));
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        throw (error);
      }
    );
  };
}

export function getPostsReportByDate(startDate, endDate) {
  return dispatch => {
    dispatch(beginAjaxCall());
    postsApi.getPostsReportByDate(startDate, endDate).then (
      resp => {
        dispatch(getPostsReportByDateSuccess(resp.data));
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        throw (error);
      }
    );
  };
}

export function getPostsCount(contactId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    postsApi.getPostsCount(contactId).then (
      resp => {
        dispatch(getPostsCountSuccess(resp.data));
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        throw (error);
      }
    );
  };
}

export function getPostsByContactId(contactId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    postsApi.getPostsByContactId(contactId).then(
      resp => {
        dispatch(getPostsByContactIdSuccess(resp.data));
      }
    ).catch(
      error => {
        dispatch(ajaxCallError());
        throw (error);
      }
    );
  };
}
