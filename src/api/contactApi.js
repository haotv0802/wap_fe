import HttpClient from "./HttpClient";
import {GET_CONTACTS_LIST_URL, GET_CRAWLED_DATA_URL} from "./constants";

class ContactApi {
  static getContacts(pageNumber, pageSize) {
    console.log(pageNumber);
    return HttpClient.get(GET_CONTACTS_LIST_URL, {params: {"page" : pageNumber, "size" : pageSize}});
  }
}

export default ContactApi;
