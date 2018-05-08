import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function contactReducer(state = initialState.contact, action) {
  switch(action.type) {
    case types.GET_CONTACT_LIST_SUCCESS:
      return Object.assign({}, state, {list: action.contacts});
    default:
      return state;
  }
}
