import HttpClient from "./HttpClient";
import {GET_CUSTOMERS_LIST_URL, UPDATE_CUSTOMERS_LIST_URL, ADD_CUSTOMER_URL, DELETE_CUSTOMER_URL} from "./constants";

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

  static addCustomer(customer) {
    return HttpClient.post(ADD_CUSTOMER_URL, customer);
  }

  static deleteCustomers(customers) {
    return HttpClient.post(DELETE_CUSTOMER_URL, customers);
  }
}

export default ContactApi;
