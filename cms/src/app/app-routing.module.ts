import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ ContactsComponent } from "./contacts/contacts.component";
import{ MessagesComponent } from "./messages/messages.component";
import { DocumentsComponent } from "./documents/documents.component";
import {DocumentEditComponent} from "./documents/document-edit/document-edit.component";
import {DocumentDetailComponent} from "./documents/document-detail/document-detail.component";
import {ContactsDetailComponent} from "./contacts/contacts-detail/contacts-detail.component";
import {ContactEditComponent} from "./contacts/contact-edit/contact-edit.component";


const appRoutes: Routes = [
  {path: '', redirectTo: '/documents', pathMatch: 'full'},
  {path: 'contacts', component: ContactsComponent, children: [
      {path: 'new', component: ContactEditComponent},
      {path: ':id', component: ContactsDetailComponent},
      {path: ':id/edit', component: ContactEditComponent}
    ]},
  {path: 'documents', component: DocumentsComponent, children: [
      {path: 'new', component: DocumentEditComponent},
      {path: ':id', component: DocumentDetailComponent },
      {path: ':id/edit', component: DocumentEditComponent}
    ]},
  {path: 'messages', component: MessagesComponent}
]



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
