import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";
import postsApi from "../api/postsApi";

export function getPostsCountSuccess(count) {
  return {type: types.GET_POSTS_COUNT_SUCCESS, count};
}

export function getPostsByContactIdSuccess(data) {
  return {type: types.GET_POSTS_BY_CONTACT_ID_SUCCESS, data};
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
