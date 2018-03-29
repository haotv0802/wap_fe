import HttpClient from "./HttpClient";
import {GET_POSTS_COUNT} from "./constants";

class postsApi {
  static getPostsCount() {
    return HttpClient.get(GET_POSTS_COUNT);
  }
}

export default postsApi;
