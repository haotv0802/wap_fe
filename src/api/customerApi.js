import HttpClient from "./HttpClient";
import {GET_CUSTOMERS_LIST_URL, UPDATE_CUSTOMERS_LIST_URL} from "./constants";

class ContactApi {
  static getCustomers(name, phone, email, pageNumber, pageSize) {
    return HttpClient.get(GET_CUSTOMERS_LIST_URL,
      {params:
          {"name" : name, "phone" : phone, "email" : email, "page" : pageNumber, "size" : pageSize}
      });
  }

  static updateCustomers(customers) {
    return HttpClient.post(UPDATE_CUSTOMERS_LIST_URL, customers);
  }
}

export default ContactApi;
