import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Document } from '../documents.model';
import { DocumentsService} from "../documents.service";
import { Subscription } from 'rxjs/Subscription';

import {ContactsService} from "../../contacts/contacts.service";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  private subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentsService: DocumentsService) {
    this.documents = documentsService.getDocuments();
  }

  ngOnInit() {
    this.documentsService.documentChangedEvent.subscribe((documents: Document[]) =>{
      this.documents = documents;
    });
    this.subscription = this.documentsService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

