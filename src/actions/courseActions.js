import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall} from "./ajaxStatusActions";

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses};
}

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(
      courses => {
        dispatch(loadCoursesSuccess(courses));
      }
    ).catch(
      error => {
        throw(error);
      }
    );
  };
}
