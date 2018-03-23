import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Contact} from "../contact.model";
import {ContactsService} from "../contacts.service";
import {Document} from "../../documents/documents.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // THE OLD ONE: @Output() selectedContactEvent = new EventEmitter<Contact>();
  private subscription: Subscription;
  contact: Contact = null;
  contacts: Contact[] = [];
  onSelected(contact: Contact){
    this.contactsService.contactSelectedEvent.emit(contact);
  }

  constructor( private contactsService: ContactsService){ }



  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
    this.contactsService.contactChangedEvent
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
    this.subscription = this.contactsService.contactListChangedEvent
      .subscribe(
        (contactsList: Contact[]) => {
          this.contacts = contactsList;
        });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
