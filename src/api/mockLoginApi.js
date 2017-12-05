import delay from './delay';

class LoginApi {
  static login() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([]));
      }, delay);
    });
  }

}

export default LoginApi;
