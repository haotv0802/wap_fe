import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function customerReducer(state = initialState.customer, action) {
  switch(action.type) {
    case types.GET_CUSTOMER_LIST_SUCCESS:
      return Object.assign({}, state, {data: action.data});
    case types.UPDATE_CUSTOMER_LIST_SUCCESS:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          content: Object.assign([], state.data.content, action.data)
        })
      });
    case types.ADD_CUSTOMER_SUCCESS:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          content: Object.assign([], state.data.content, action.data)
        })
      });
    case types.ADD_CUSTOMER_ERROR:
      return Object.assign({}, state);
    default:
      return state;
  }
}
