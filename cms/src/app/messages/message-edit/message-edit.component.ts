import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Message} from "../message.model";

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: string = 'Eric'
  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;

  onSendMessage(){
    const subjectVal = this.subjectRef.nativeElement.value;
    const msgTxtVal = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(1, subjectVal, msgTxtVal, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear(){
   this.subjectRef.nativeElement.value = '';
   this.msgTextRef.nativeElement.value = '';
  }
  constructor() { }

  ngOnInit() {
  }

}
