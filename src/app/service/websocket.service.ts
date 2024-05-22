import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ChatMessageDTO } from '../Entites/ChatMessageDTO.Entites';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  webSocket!: WebSocket;

  chatMessages: ChatMessageDTO[] = [];


  constructor(private crudService: CrudService) {
    this.crudService.listechat().subscribe(w=> this.chatMessages = w)
  }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:9090/api/data');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      this.crudService.listechat().subscribe(w=> this.chatMessages = w)
      /*const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);*/
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDTO){
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
