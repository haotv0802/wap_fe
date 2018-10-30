import axios from 'axios';

class HttpClient {
  static get(url, params) {
    return axios.get(url, params)
      .then(onSuccess)
      .catch(onError)
      ;
  }

  static post(url, data) {
    return axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }})
      .then(onSuccess)
      .catch(onError)
      ;
  }

  static put(url, data) {
    return axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }})
      .then(onSuccess)
      .catch(onError)
      ;
  }
}

const onSuccess = function (response) {
  console.debug('Request Successful!', response);
  return new Promise((resolve) => {
    resolve(response);
  });
};

const onError = function (error) {
  console.error('Request Failed:', error.config);

  if (error.response) {
    // Request was made but server responded with something
    // other than 2xx
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    console.error('Headers:', error.response.headers);

  } else {
    // Something else happened while setting up the request
    // triggered the error
    console.error('Error Message:', error.message);
  }

  return Promise.reject(error.response || error.message);
};

export default HttpClient;
