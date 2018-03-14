import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import {Document} from "../documents/documents.model";
@Injectable()
export class ContactsService {

  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts :Contact[] = [];

contactSelectedEvent = new EventEmitter<Contact>();
  constructor() {
    this.contacts = MOCKCONTACTS;
  }
deleteContact(contact: Contact){

    if(contact == null){
      return
    }
    const pos = this.contacts.indexOf(contact);
    if(pos < 0 ){
      return;
    }

    this.contacts.splice(pos,1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  getContacts() :Contact[]{
    return this.contacts.slice();
  } ;

  getContact(id:string ):Contact {
    for( let contact of this.contacts){
      if (contact.id == id){
        return contact;
      }//end if
    }//end for
    return null;
  }
}
