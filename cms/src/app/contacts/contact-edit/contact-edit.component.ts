import { Component, OnInit } from '@angular/core';
import {ContactsService} from "../contacts.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {Contact} from "../contact.model";
import {NgForm} from "@angular/forms";
import {Document} from "../../documents/documents.model";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  invalidGroupContact: boolean;
  id: string;
  originalContact: Contact;
contact: Contact = null;
groupContacts: Contact[] =[];
editMode: boolean = false;
hasGroup: boolean = false;

  onSubmit(form: NgForm){
    let newId = this.contactsService.getMaxId();
    newId = newId++;
    let values = form.value;
    let newContact = new Contact(newId.toString(), values['name'], values['email'], values['phone'], values['imageUrl'], null);
    if(this.editMode){
      this.contactsService.updateContact(this.contact, newContact);
    } else  {
      this.contactsService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);

  }
  onCancel(){
    this.router.navigate(['/contacts']);
  }
  isInvalidContact(newContact: Contact){
    if(!newContact){
      return true;
    }
    if (newContact.id === this.contact.id){
      return true;
    }
    for(let i=0; i < this.groupContacts.length; i++){
      if(newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }
  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) return;
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }
  onRemoveItem(idx: number) {
    if(idx < 0 || idx >= this.groupContacts.length)
      return;

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute ) {

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (this.id == null) {
            this.editMode = false;
            return;
          }
          this.contact= this.contactsService.getContact(this.id);
          if( this.contact == null) return;

          this.editMode = true;
          this.contact= JSON.parse(JSON.stringify(this.contact));
          if( this.contact.group != null) {
            this.groupContacts = this.contact.group.slice();
          }
        }
      );
  }

}
