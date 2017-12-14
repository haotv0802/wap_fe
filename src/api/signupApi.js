import HttpClient from "./HttpClient";

class signupApi {
  static signup(user) {
      return HttpClient.post("http://localhost:8888/wap_be/svc/signup", user);
  }
}

export default signupApi;
