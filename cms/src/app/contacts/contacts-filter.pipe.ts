import { Pipe, PipeTransform } from '@angular/core';
import { Contact} from "./contact.model";

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: any, [term]: any): any {

    let filteredArray: Contact[] = [];
   filteredArray = contacts.filter()
    return null;
  }

}
