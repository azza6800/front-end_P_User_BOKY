import { Component } from '@angular/core';
import { ChatMessageDTO } from '../Entites/ChatMessageDTO.Entites';
import { WebsocketService } from '../service/websocket.service';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  users:number[] = [1,2,3,4];
  paramurl:any;
  date!: Date;
  messages:any;
  data:any;
  constructor(public webSocketService: WebsocketService,private service :CrudService ,
              private Activated:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();




  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage() {
    this.date=new Date();
    this.data = this.service.getUserInfo()
    

      const chatMessageDto = new ChatMessageDTO(
        this.data.nom + " " + this.data.prenom,
        this.date,
        this.messages,
        this.data.role);

    this.service.addNewChat(chatMessageDto).subscribe(); 
   
      this.webSocketService.sendMessage(chatMessageDto);
      
      this.messages = '';
     

  }
}
