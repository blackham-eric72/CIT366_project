import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, 'assignments', 'a list of assignments', 'assignments.com', 'none'),
    new Document(2, 'dummy1', 'dummmy stuff', 'dummy.com', 'none'),
    new Document(3, 'dummy2', 'more dummy stuff', 'dummy.com', 'none'),
    new Document(4, 'dummy3', 'such a dummy', 'dummy.com', 'none')
      ];
  constructor() { }

  ngOnInit() {
  }
  onSelectedDocument(document: Document) {
    console.log('document.name = ' + document.name);

    this.selectedDocumentEvent.emit(document);
  }

}

