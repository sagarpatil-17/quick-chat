import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api.config';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(API_BASE_URL);
  }

  sendMessage(data: { groupId: string; senderId: string; content: string }): void {
    this.socket.emit('sendMessageToGroup', data);
  }

  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('sendMessageToGroup', (data) => observer.next(data));
    });
  }
}
