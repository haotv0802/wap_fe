import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function postsReducer(state = initialState.posts, action) {
  switch(action.type) {
    case types.GET_POSTS_COUNT_SUCCESS:
      return Object.assign({}, state, {count: action.count});
    default:
      return state;
  }
}
