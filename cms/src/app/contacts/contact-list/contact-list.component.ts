import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Contact} from "../contact.model";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // THE OLD ONE: @Output() selectedContactEvent = new EventEmitter<Contact>();


  contact: Contact = null;
  contacts: Contact[] = [];
  onSelected(contact: Contact){
    this.contactsService.contactSelectedEvent.emit(contact);
  }

  constructor( private contactsService: ContactsService) {

  }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }


}
