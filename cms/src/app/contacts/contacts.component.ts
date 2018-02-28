import { Component, OnInit } from '@angular/core';
import {ContactsService} from "./contacts.service";
import { Contact } from "./contact.model";


@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
 selectedContact = null;
 infoText = 'This is a placeholder indicating that selected Contact is null';
  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.contactSelectedEvent.subscribe(
      (contact: Contact)=>{
      this.selectedContact = contact;
    }
  );
  }
}
