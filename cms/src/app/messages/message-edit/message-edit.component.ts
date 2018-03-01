import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Message} from "../message.model";
import {MessagesService} from "../messages.service";

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: string = '1';
  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;

  onSendMessage(){
    const subjectVal = this.subjectRef.nativeElement.value;
    const msgTxtVal = this.msgTextRef.nativeElement.value;
    const newMsgId = this.messagesService.messages.length+1;
    const msgId: string = newMsgId.toString();
    const newMessage = new Message(msgId,subjectVal, msgTxtVal, this.currentSender);
    this.addMessageEvent.emit(newMessage);
    this.messagesService.addMessage(newMessage);
  }

  onClear(){
   this.subjectRef.nativeElement.value = '';
   this.msgTextRef.nativeElement.value = '';
  }
  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

}
