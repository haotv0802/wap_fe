import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";
import toastr from 'toastr';
import {getCrawledDataSuccess} from "./crawledDataActions";

export function getURLListSuccess(crawlingInfo) {
  return {type: types.CRAWLING_URL_SUCCESS, crawlingInfo};
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
