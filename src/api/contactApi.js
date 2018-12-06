import HttpClient from "./HttpClient";
import {GET_CONTACTS_LIST_URL, UPDATE_CONTACTS_LIST_URL} from "./constants";

class ContactApi {
  static getContacts(name, phone, email, type, manualCheck, emailExisting, pageNumber, pageSize, sortingMap) {
    let keys = sortingMap.keys();
    let sorting = "";
    for (let key of keys) {
      let name = key.split("_")[0];
      sorting += "&sort=" + name + "," + (sortingMap.get(key) % 2 === 0 ? "asc" : "desc");
    }
    sorting = "?" + sorting.substr(1, sorting.length);

    return HttpClient.get(GET_CONTACTS_LIST_URL + sorting,
      {params:
          {"name" : name, "phone" : phone, "email" : email, "type" : type, "manualCheck" : manualCheck, "emailExisting" : emailExisting,
            "page" : pageNumber, "size" : pageSize
          }
      });
  }

  static updateContacts(contacts) {
    return HttpClient.post(UPDATE_CONTACTS_LIST_URL, contacts);
  }
}

export default ContactApi;
