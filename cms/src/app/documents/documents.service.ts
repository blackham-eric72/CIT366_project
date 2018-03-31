import {EventEmitter, Injectable} from '@angular/core';
import { MOCKDOCUMENTS } from  "./MOCKDOCUMENTS";
import {Document} from "./documents.model";
import { Subject} from "rxjs/Subject";
import {Contact} from "../contacts/contact.model";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

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

  initDocuments(){
    this.http.get('https://cmscit366.firebaseio.com/documents.json')
      .map(
        (response: Response) => {
          const documents: Document[] = response.json();
          return documents;
        }
      )
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
        }

      )

  }

  storeDocuments(){
    let documentArray = JSON.stringify(this.documents);
    console.log('store documents method called');
    console.log('the array that should be passed on is this: ' + documentArray);
   this.http.put('https://cmscit366.firebaseio.com/documents.json', documentArray)
     .subscribe(
       (response: Response)=> {
         console.log(response)
         console.log('Response has happened');

       }
  );
  }


  addDocument(newDocument: Document) {
    if (newDocument === undefined || newDocument === null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    let documentsListClone = this.documents.slice();
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if( originalDocument == null || newDocument == null) return null;
    let pos = this.documents.indexOf(originalDocument);
    if( pos < 0 ) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.storeDocuments();;

  }

  deleteDocument(document: Document){
    if( document == null) return;
    let pos = this.documents.indexOf(document);
    if( pos < 0 ) return;
    this.documents.splice( pos, 1);
    let documentsListClone = this.documents.slice();
    this.storeDocuments();;
  }

  constructor(private http: Http){
  this.initDocuments();
  }

}
