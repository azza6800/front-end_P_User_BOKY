export class ChatMessageDTO {
    sender: string;
    date:Date = new Date();
    messages: string;
    role!:string;
  
    constructor(sender: string,date:Date, messages: string,role:string){
      this.sender = sender;
      this.date = date;
      this.messages = messages;
      this.role = role;
    }
  }