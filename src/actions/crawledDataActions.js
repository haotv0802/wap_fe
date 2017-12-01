import * as types from './actionTypes';
import crawledDataApi from '../api/mockCrawledDataApi';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';

export function saveAndLoadCrawledDataSuccess(crawledData) {
  return {type: types.SAVE_AND_LOAD_CRAWLED_DATA_SUCCESS, crawledData};
}

export function saveAndLoadCrawledData() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return crawledDataApi.getAllCrawledData().then (
      res => {
        setTimeout(() =>{
          dispatch(saveAndLoadCrawledDataSuccess(res.data));
          toastr.success("Crawling data success!");
        }, 3000);
      }
    ).catch(
      error => {
        dispatch(ajaxCallError(error));
        throw(error);
      }
    );
  };
}
