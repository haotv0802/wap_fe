import HttpClient from "./HttpClient";
import {GET_POSTS_COUNT_BY_CONTACT_ID} from "./constants";

class postsApi {
  static getPostsCount(contactId) {
    return HttpClient.get(GET_POSTS_COUNT_BY_CONTACT_ID + `?id=${contactId}`);
  }
}

export default postsApi;
