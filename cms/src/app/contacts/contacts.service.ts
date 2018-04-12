import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import {Subject} from "rxjs/Subject";
import {Document} from "../documents/documents.model";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // this.maxContactId++;
    const strContact = JSON.stringify(newContact);
    this.http.post('http://localhost:3000/contacts', strContact, {headers: headers})
      .map(
        (res: any) => {
          return res.obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == null || newContact == null) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const strContact = JSON.stringify(newContact);
    this.http.patch('http://localhost:3000/contacts/' + originalContact.id, strContact,{headers: headers})
      .map(
        (res: any) => {
          return res.obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }

  deleteContact(contact: Contact){
    if ( !contact) {
        return;
      }
      this.http.delete('http://localhost:3000/contacts/'+ contact.id)
        .map(
          (res: any) => {
            return res.obj;
          })
        .subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.contactChangedEvent.next(this.contacts.slice());
          }
        );
    }

  initContacts(){
    this.http.get('http://localhost:3000/contacts')
      .map(
        (response: any) => {
          // const contacts: Contact[] = response.json();
          return response.obj;
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




  constructor(private http: HttpClient){
    this.initContacts();
  }

}
