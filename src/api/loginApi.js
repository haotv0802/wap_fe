import HttpClient from "./HttpClient";
import {LOGIN_URL} from "./constants";

class LoginApi {
  static login(credentails) {
      return HttpClient.post(LOGIN_URL, credentails);
  }
}

export default LoginApi;
