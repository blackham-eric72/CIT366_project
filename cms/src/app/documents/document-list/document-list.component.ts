import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../documents.model';
import { DocumentsService} from "../documents.service";
import {ContactsService} from "../../contacts/contacts.service";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [];

  constructor(private documentsService: DocumentsService) {
    this.documents = documentsService.getDocuments();
  }

  ngOnInit() {
    this.documentsService.documentChangedEvent.subscribe((documents: Document[]) =>{
      this.documents = documents;
    });
  }

}

