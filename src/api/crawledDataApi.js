import HttpClient from "./HttpClient";
import {GET_CRAWLED_DATA_URL} from "./constants";

class LoginApi {
  static getCrawledData() {
      return HttpClient.get(GET_CRAWLED_DATA_URL);
  }
}

export default LoginApi;
