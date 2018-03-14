import {EventEmitter, Injectable} from '@angular/core';
import { MOCKDOCUMENTS } from  "./MOCKDOCUMENTS";
import {Document} from "./documents.model";
import {Contact} from "../contacts/contact.model";

@Injectable()
export class DocumentsService {

documentChangedEvent = new EventEmitter<Document[]>()
documents: Document[] = [];
documentSelectedEvent = new EventEmitter<Document>();
getDocuments() :Document[]{
    return this.documents.slice();
} ;

  getDocument(id:string ):Document {
    for( let document of this.documents){
      if (document.id === id){
        return document;
      }//end if
    }//end for
    return null;
  }

  deleteDocument(document: Document){
    if(document == null){
      return
    }
    const pos = this.documents.indexOf(document);
    if(pos < 0 ){
      return;
    }

    this.documents.splice(pos,1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

}
