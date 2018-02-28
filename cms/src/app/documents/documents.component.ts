import { Component, OnInit } from '@angular/core';
import { Document } from './documents.model';
import {DocumentsService} from "./documents.service";
import {Contact} from "../contacts/contact.model";

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  selectedDocument: Document;

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documentsService.documentSelectedEvent.subscribe(
      (document: Document)=>{
        this.selectedDocument = document;
      }
    );
  }
}
