import axios from 'axios';

class HttpClient {
  static get(url, params) {
    return axios.get(url, params)
      // .then(onSuccess)
      .catch(onError)
      ;
  }

  static post(url, data) {
    return axios.post(url, data)
      .catch(onError)
      ;
  }
}

const onSuccess = function(response) {
  console.debug('Request Successful!', response);
  return response.data;
};

const onError = function(error) {
  console.error('Request Failed:', error.config);

  if (error.response) {
    // Request was made but server responded with something
    // other than 2xx
    console.error('Status:',  error.response.status);
    console.error('Data:',    error.response.data);
    console.error('Headers:', error.response.headers);

  } else {
    // Something else happened while setting up the request
    // triggered the error
    console.error('Error Message:', error.message);
  }

  return Promise.reject(error.response || error.message);
};

export default HttpClient;
