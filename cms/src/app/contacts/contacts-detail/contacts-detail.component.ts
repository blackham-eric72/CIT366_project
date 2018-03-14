import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import {ContactsService} from "../contacts.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
id: string;
contact: Contact;

onDelete() {
  this.contactsService.deleteContact(this.contact);
  this.router.navigate(['/contacts']);
}
  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe( (params: Params) => {
      this.id = params['id'];
      this.contact = this.contactsService.getContact(this.id);
      }
    )
  }

}
