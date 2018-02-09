import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelect(feature: string) {
    this.selectedFeatureEvent.emit(feature);
  }
  constructor() { }

  ngOnInit() {
  }

}
