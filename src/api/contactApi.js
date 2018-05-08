import HttpClient from "./HttpClient";
import {GET_CONTACTS_LIST_URL} from "./constants";

class ContactApi {
  static getContacts() {
    return HttpClient.get(GET_CONTACTS_LIST_URL);
  }
}

export default ContactApi;
