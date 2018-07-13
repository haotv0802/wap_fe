import HttpClient from "./HttpClient";
import {GET_CONTACTS_LIST_URL} from "./constants";

class ContactApi {
  static getContacts(name, phone, email, type, manualCheck, emailExisting, pageNumber, pageSize) {
    console.log(pageNumber);
    console.log(pageSize);
    console.log(email);
    console.log(phone);
    return HttpClient.get(GET_CONTACTS_LIST_URL,
      {params:
          {"name" : name, "phone" : phone, "email" : email, "type" : type, "manualCheck" : manualCheck, "emailExisting" : emailExisting,
            "page" : pageNumber, "size" : pageSize}
      });
  }
}

export default ContactApi;
