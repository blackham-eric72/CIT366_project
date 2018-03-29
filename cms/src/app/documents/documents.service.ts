import {EventEmitter, Injectable} from '@angular/core';
import { MOCKDOCUMENTS } from  "./MOCKDOCUMENTS";
import {Document} from "./documents.model";
import { Subject} from "rxjs/Subject";
import {Contact} from "../contacts/contact.model";

@Injectable()
export class DocumentsService {
 maxDocumentId :number;
 documentListChangedEvent = new Subject<Document[]>();
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
  // THE OLD DELETE DOCUMENT FUNCTION!!!
  // deleteDocument(document: Document){
  //   if(document == null){
  //     return
  //   }
  //   const pos = this.documents.indexOf(document);
  //   if(pos < 0 ){
  //     return;
  //   }
  //   this.documents.splice(pos,1);
  //   this.documentChangedEvent.emit(this.documents.slice());
  // }

  getMaxId():number {

    var maxId = 0;

    for(let document of this.documents){
      let currentId = parseInt(document.id);
      if( currentId > maxId){
        maxId = currentId;
      } //end if
    } //end for
    return maxId;
  }
  // addDocument(newDocument: Document){
  //   if(newDocument == null) return;
  //   this.maxDocumentId++;
  //   newDocument.id = this.maxDocumentId.toString();
  //   console.log('addDocument-newDocument: ' + newDocument);
  //   this.documents.push(newDocument);
  //
  // }

  addDocument(newDocument: Document) {
    if (newDocument === undefined || newDocument === null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if( originalDocument == null || newDocument == null) return null;
    let pos = this.documents.indexOf(originalDocument);
    if( pos < 0 ) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);

  }

  deleteDocument(document: Document){
    if( document == null) return;
    let pos = this.documents.indexOf(document);
    if( pos < 0 ) return;
    this.documents.splice( pos, 1);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  constructor(){
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

}
