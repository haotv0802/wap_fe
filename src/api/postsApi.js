import HttpClient from "./HttpClient";
import {GET_POSTS_COUNT_BY_CONTACT_ID, GET_POSTS_BY_CONTACT_ID} from "./constants";

class postsApi {
  static getPostsCount(contactId) {
    return HttpClient.get(GET_POSTS_COUNT_BY_CONTACT_ID + `?id=${contactId}`);
  }

  static getPostsByContactId(contactId) {
    return HttpClient.get(GET_POSTS_BY_CONTACT_ID + `?contactId=${contactId}`);
  }
}

export default postsApi;
