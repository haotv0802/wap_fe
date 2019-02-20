import HttpClient from "./HttpClient";
import {GET_POSTS_COUNT_BY_CONTACT_ID, GET_POSTS_BY_CONTACT_ID, GET_POSTS_REPORT_BY_DATE, GET_POSTS_REPORT_BY_MONTH} from "./constants";

class postsApi {
  static getPostsReportByDate(startDate, endDate) {
    return HttpClient.get(GET_POSTS_REPORT_BY_DATE + `?startDate=${startDate}&endDate=${endDate}`);
  }

  static getPostsReportByMonth(startMonth, startYear, endMonth, endYear) {
    return HttpClient.get(GET_POSTS_REPORT_BY_MONTH + `?startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear}`);
  }

  static getPostsCount(contactId) {
    return HttpClient.get(GET_POSTS_COUNT_BY_CONTACT_ID + `?id=${contactId}`);
  }

  static getPostsByContactId(contactId) {
    return HttpClient.get(GET_POSTS_BY_CONTACT_ID + `?contactId=${contactId}`);
  }
}

export default postsApi;
