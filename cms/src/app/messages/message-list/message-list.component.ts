import { Component, OnInit } from '@angular/core';
import { Message} from "../message.model";

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
messages: Message[] = [
  new Message(2, 'hello', 'hi, how is it going?', 'eric'),
  new Message(3, 'what?', 'are you kidding me?', 'billy'),
  new Message(4,'oh yeah','mr. koolaid man!','yourmom')
];
  constructor() { }

  ngOnInit() {
  }
  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
