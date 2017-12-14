import HttpClient from "./HttpClient";
import {SIGNUP_URL} from "./constants";

class signupApi {
  static signup(user) {
      return HttpClient.post(SIGNUP_URL, user);
  }
}

export default signupApi;
