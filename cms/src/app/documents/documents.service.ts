import {EventEmitter, Injectable} from '@angular/core';
import { MOCKDOCUMENTS } from  "./MOCKDOCUMENTS";
import {Document} from "./documents.model";
import { Subject} from "rxjs/Subject";
import {Contact} from "../contacts/contact.model";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
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
      }// end if
    }// end for
    return null;
  }


  getMaxId():number {

    let maxId = 0;

    for(let document of this.documents){
      let currentId = parseInt(document.id);
      if( currentId > maxId){
        maxId = currentId;
      } //end if
    } //end for
    return maxId;
  }

  initDocuments(){
    this.http.get('http://localhost:3000/documents')
      .map(
        (res: any) => {
        return res.obj;
    })
      .subscribe(
        (documentsReturned: Document[]) => {
            this.documents = documentsReturned;
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
     .map(
       (res: any) => {
         return res.obj;
       })
     .subscribe(
       ()=> {
         const documentListClone = this.documents.slice();
         this.documentListChangedEvent.next(documentListClone);

       }
  );
  }


  addDocument(newDocument: Document) {
    if (newDocument === undefined || newDocument === null) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const strDocument = JSON.stringify(newDocument);
    this.http.post('http://localhost:3000/documents', strDocument, {headers: headers})
      .map(
        (res: any) => {
          return res.obj;
        })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
    }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if( originalDocument == null || newDocument == null){
       return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if( pos < 0 ) {return;}
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const strDocument = JSON.stringify(newDocument);
    this.http.patch('http://localhost:3000/documents/' + originalDocument.id, strDocument,{headers: headers} )
      .map(
        (res: any) => {
          return res.obj;
        })
      .subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.documentChangedEvent.next(this.documents.slice());
      }
    );
    // newDocument.id = originalDocument.id;
    // this.documents[pos] = newDocument;
    // let documentsListClone = this.documents.slice();
    // this.storeDocuments();

  }
  deleteDocument(document: Document) {
    if ( !document) {
      return;
    }
    this.http.delete('http://localhost:3000/documents/'+ document.id)
      .map(
        (res: any) => {
          return res.obj;
        })
    .subscribe(
      (documents: Document[]) => {

        this.documents = documents;
        this.documentChangedEvent.next(this.documents.slice());
      }
    );
  }

  constructor(private http: HttpClient) {
  this.initDocuments();
  }

}
