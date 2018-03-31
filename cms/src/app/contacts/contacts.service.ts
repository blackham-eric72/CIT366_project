import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import {Subject} from "rxjs/Subject";
import {Document} from "../documents/documents.model";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
@Injectable()
export class ContactsService {
 maxContactId: number;
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts :Contact[] = [];
 contactListChangedEvent = new Subject<Contact[]>();

contactSelectedEvent = new EventEmitter<Contact>();

  getContactFromDB(): Contact[] {
    if(this.contacts) {
      return this.contacts.slice();
    }

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


  addContact(newContact: Contact) {
    if (newContact === undefined || newContact === null) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.storeContacts;
  }
  updateContact(originalContact: Contact, newContact: Contact){
    if( originalContact == null || newContact == null) return null;
    let pos = this.contacts.indexOf(originalContact);
    if( pos < 0 ) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.storeContacts;

  }

  deleteContact(contact: Contact){
    if( contact == null) return;
    let pos = this.contacts.indexOf(contact);
    if( pos < 0 ) return;
    this.contacts.splice( pos, 1);
    let documentsListClone = this.contacts.slice();
    this.storeContacts();
  }

  initContacts(){
    this.http.get('https://cmscit366.firebaseio.com/contacts.json')
      .map(
        (response: Response) => {
          const contacts: Contact[] = response.json();
          return contacts;
        }
      )
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      )
  }

  storeContacts(){
    let documentArray = JSON.stringify(this.contacts);
    console.log('store contacts method called');
    console.log('the array that should be passed on is this: ' + documentArray);
    this.http.put('https://cmscit366.firebaseio.com/contacts.json', documentArray)
      .subscribe(
        (response: Response)=> {
          console.log(response)
          console.log('Response has happened in store contacts');

        }
      );
  }


  constructor(private http: Http){
    this.initContacts();
  }

}
