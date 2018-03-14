import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../documents.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import { Document } from "../documents.model";
import { WindRefService} from "../../wind-ref.service";

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  nativeWindow: any;
  document: Document;
  id: string;
  constructor(private documentsService: DocumentsService,
              private route: ActivatedRoute,
              private router: Router,
              private windRefService: WindRefService) {
    this.nativeWindow = windRefService.getNativeWindow();

  }

  onDelete(){
    this.documentsService.deleteDocument(this.document)
    this.router.navigate(['/documents']);
  }

  onView(){
    if(this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentsService.getDocument(this.id);
        }
      );
  }
}
