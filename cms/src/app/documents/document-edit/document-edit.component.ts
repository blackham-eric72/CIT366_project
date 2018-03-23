import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { DocumentsService} from "../documents.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import { Document} from "../documents.model";

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;
  document: Document;
  originalDocument: Document;
  editMode: boolean = false;

  onSubmit(form: NgForm){
    let newId = this.documentsService.getMaxId();
    newId = newId++;
    let values = form.value;
    let newDocument = new Document(newId.toString(), values['name'], values['description'], values['url'], null);
    if(this.editMode){
      this.documentsService.updateDocument(this.originalDocument, newDocument);
    } else  {

      this.documentsService.addDocument(newDocument);
      console.log('documentsService.addDocument was called!');
      console.log(newDocument);
    }
    this.router.navigate(['/documents']);
    console.log('this crap works!');
  }

  onCancel(){
    this.router.navigate(['/documents']);
  }

  constructor(private documentsService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (this.id == null) {
            this.editMode = false;
            return;
          }
          this.originalDocument = this.documentsService.getDocument(this.id);
          if( this.originalDocument == null) return;

          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }

}
