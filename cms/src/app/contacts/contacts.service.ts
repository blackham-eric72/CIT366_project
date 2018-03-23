import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import {Subject} from "rxjs/Subject";
import {Document} from "../documents/documents.model";
@Injectable()
export class ContactsService {
 maxContactId: number;
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts :Contact[] = [];
 contactListChangedEvent = new Subject<Contact[]>();

contactSelectedEvent = new EventEmitter<Contact>();

// deleteContact(contact: Contact){
//
//     if(contact == null){
//       return
//     }
//     const pos = this.contacts.indexOf(contact);
//     if(pos < 0 ){
//       return;
//     }
//
//     this.contacts.splice(pos,1);
//     this.contactChangedEvent.emit(this.contacts.slice());
//   }

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
  getMaxId():number {

    var maxId = 0;

    for(let contact of this.contacts){
      let currentId = parseInt(contact.id);
      if( currentId > maxId){
        maxId = currentId;
      } //end if
    } //end for
    return maxId;
  }
  // addContact(newContact: Contact){
  //   if(newContact == null) return;
  //   this.maxContactId++;
  //   newContact.id = this.maxContactId.toString();
  //   this.contacts.push(newContact);
  // }


  addContact(newContact: Contact) {
    if (newContact === undefined || newContact === null) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }





  updateContact(originalContact: Contact, newContact: Contact){
    if( originalContact == null || newContact == null) return null;
    let pos = this.contacts.indexOf(originalContact);
    if( pos < 0 ) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);

  }

  deleteContact(contact: Contact){
    if( contact == null) return;
    let pos = this.contacts.indexOf(contact);
    if( pos < 0 ) return;
    this.contacts = this.contacts.splice( pos, 1);
    let documentsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(documentsListClone);
  }

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

}
