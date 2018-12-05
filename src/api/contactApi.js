import HttpClient from "./HttpClient";
import {GET_CONTACTS_LIST_URL, UPDATE_CONTACTS_LIST_URL} from "./constants";

class ContactApi {
  static getContacts(name, phone, email, type, manualCheck, emailExisting, pageNumber, pageSize, nameSorting, phoneSorting) {
    let sorting = (nameSorting !== undefined ? ("sort=name," + (nameSorting === true ? "asc" : "desc")) : "");
    sorting += (phoneSorting !== undefined ? ("&sort=phone," + (phoneSorting === true ? "asc" : "desc")) : "");
    console.log(sorting);

    return HttpClient.get(GET_CONTACTS_LIST_URL + "?" + sorting,
      {params:
          {"name" : name, "phone" : phone, "email" : email, "type" : type, "manualCheck" : manualCheck, "emailExisting" : emailExisting,
            "page" : pageNumber, "size" : pageSize
            // "sort" : (nameSorting !== undefined ? ("name," + (nameSorting === true ? "asc" : "desc")) : ""),
            // "sort" : (phoneSorting !== undefined ? (",phone," + (phoneSorting === true ? "asc" : "desc")) : "")
          }
      });
  }

  static updateContacts(contacts) {
    return HttpClient.post(UPDATE_CONTACTS_LIST_URL, contacts);
  }
}

export default ContactApi;
