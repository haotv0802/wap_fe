import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function crawlingReducer(state = initialState.crawlingInfo, action) {
  switch(action.type) {
    case types.CRAWLING_URL_SUCCESS:
      return Object.assign({}, state, action.sites);
    case types.CRAWLING_CITIES_SUCCESS:
      return Object.assign({}, state, action.cities);
    case types.CRAWLING_DATA_SUCCESS:
      return state;
    case types.CRAWLING_DATA_FAILURE:
      return state;
    default:
      return state;
  }
}
