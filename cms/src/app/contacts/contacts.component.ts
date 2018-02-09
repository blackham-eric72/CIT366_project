import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
 selectedContact = null;
 infoText = 'This is a placeholder indicating that selected Contact is null';
  constructor() { }

  ngOnInit() {
  }

}
