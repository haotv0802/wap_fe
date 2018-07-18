import HttpClient from "./HttpClient";
import {GET_CONTACTS_LIST_URL, UPDATE_CONTACTS_LIST_URL} from "./constants";

class ContactApi {
  static getContacts(name, phone, email, type, manualCheck, emailExisting, pageNumber, pageSize) {
    return HttpClient.get(GET_CONTACTS_LIST_URL,
      {params:
          {"name" : name, "phone" : phone, "email" : email, "type" : type, "manualCheck" : manualCheck, "emailExisting" : emailExisting,
            "page" : pageNumber, "size" : pageSize}
      });
  }

  static updateContacts(contacts) {
    return HttpClient.put(UPDATE_CONTACTS_LIST_URL, contacts);
  }
}

export default ContactApi;
