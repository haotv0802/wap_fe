export default {
  credentials: {username: '', password: '', isAuthorized: false, serverError: null},
  signupUser: {username: '', password: '', serverError: null},
  crawledData: {posts : [], citiesAndDistricts: []},
  contact: {data: {}},
  customer: {data: {}},
  post: {count : 0, data: {}, reportByDate: {}, reportByMonth: {}},
  crawlingInfo: {sites: ['https://batdongsan.com.vn/ban-nha-rieng', 'https://batdongsan.com.vn/ban-can-ho-chung-cu']},
  ajaxCallsInProgress: 0
};
