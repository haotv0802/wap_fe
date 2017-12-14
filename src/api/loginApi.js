import HttpClient from "./HttpClient";

class LoginApi {
  static login(credentails) {
      return HttpClient.post("http://localhost:8888/wap_be/svc/login", credentails);
  }
}

export default LoginApi;
