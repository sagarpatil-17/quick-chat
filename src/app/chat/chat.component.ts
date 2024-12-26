import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SocketService } from '../socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages: any[] = [];
  newMessage: string = '';
  sender: string = 'User';

  constructor(private socketService: SocketService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/messages').subscribe((messages: any) => {
      this.messages = messages;
    });

    this.socketService.onMessage().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const messageData = { sender: this.sender, message: this.newMessage };
      this.socketService.sendMessage(messageData);
      this.newMessage = '';
    }
  }
}
