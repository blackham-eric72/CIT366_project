import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import {Contact} from "../contacts/contact.model";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class MessagesService {
  messageChangedEvent = new EventEmitter<Message[]>();

messages: Message[] = [];
maxMessageId: number;

  getMaxId():number {

    var maxId = 0;

    for(let message of this.messages){
      let currentId = parseInt(message.id);
      if( currentId > maxId){
        maxId = currentId;
      } //end if
    } //end for
    return maxId;
  }

  initMessages(){
    this.http.get('https://cmscit366.firebaseio.com/messages.json')
      .map(
        (response: Response) => {
          const messages: Message[] = response.json();
          return messages;
        }
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        }
      )
  }

  storeMessages(){
    let messageArray = JSON.stringify(this.messages);
    console.log('store messages method called');
    console.log('the array of MESSAGES that should be passed on is this: ' + messageArray);
    this.http.put('https://cmscit366.firebaseio.com/messages.json', messageArray)
      .subscribe(
        (response: Response)=> {
          console.log(response)
          console.log('Response has happened in store messages');
        }
      );
  }


  constructor(private http: Http) {
    this.initMessages();
  }
  getMessages() :Message[]{
    return this.messages.slice();
  } ;

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMessage(id:string ):Message {
    for( let message of this.messages){
      if (message.id == id){
        return message;
      }//end if
    }//end for
    return null;
  }
}
