import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function contactReducer(state = initialState.contact, action) {
  switch(action.type) {
    case types.GET_CONTACT_LIST_SUCCESS:
      return Object.assign({}, state, {data: action.data});
    case types.UPDATE_CONTACT_LIST_SUCCESS:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          content: Object.assign([], state.data.content.map((contact) =>
            Object.assign({}, contact, action.data.map((updatedContact) => updatedContact.id == contact.id))))
        }), editMode: false
      });
    case types.UPDATE_CONTACT_LIST_FAILURE:
      return Object.assign({}, state, {
        editMode: true
        }
      );
    case types.CHANGE_CONTACT_EDIT_MODE:
      return Object.assign({}, state, {
        editMode: !state.editMode
      });
    default:
      return state;
  }
}
