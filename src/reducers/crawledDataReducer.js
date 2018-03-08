import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function crawledDataReducer(state = initialState.crawledData, action) {
  switch(action.type) {
    case types.CRAWLED_DATA_SUCCESS:
      return Object.assign({}, state, {posts: action.posts});
    case types.CITIES_DISTRICTS_SUCCESS:
      return Object.assign({}, state, {citiesAndDistricts: action.citiesAndDistricts});
    default:
      return state;
  }
}
