import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { GroupService } from '../../../laptop/services/group.service';
import { every, filter, Subject, takeUntil } from 'rxjs';
import { SocketService } from '../../services/socket.service';
import { SharedService } from '../../services/shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {

  public isHome: boolean = false;
  private unsubscribe$ = new Subject<void>();
  messages: any[] = [];
  newMessage: string = '';
  public groupInfo: any;
  private id: any;

  constructor(private router: Router, private actRoute: ActivatedRoute, private _groupService: GroupService, private _socketService: SocketService, private _sharedService: SharedService) { }

  ngOnInit() {
    // Fetch the initial ID and group messages
    this.updateRouteInfo();

    // Subscribe to router events to detect navigation changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.updateRouteInfo();
      });
  }

  private updateRouteInfo() {
    this.isHome = this.router.url.startsWith('/home');
    this.id = this.actRoute.snapshot.params['id'];

    // Fetch group messages if ID exists
    if (this.id) {
      this.getGroupMessages();
      this.subscribeToMessages();
    }
  }

  private getGroupMessages() {
    this._groupService.getGroupMessage(this.id).subscribe((res: any[]) => {
      [this.groupInfo, this.messages] = res;
    });
  }

  private subscribeToMessages(): void {
    this._socketService.onMessage().subscribe((message) => {
      if (message.groupId == this.id) {
        this.messages.push(message);
      }
    });
  }

  public sendMessage(): void {
    if (this.newMessage.trim()) {
      const messageData = {
        groupId: this.id,
        senderId: this._sharedService.userInfo.id,
        content: this.newMessage,
      };
      this._socketService.sendMessage(messageData);
      this.newMessage = '';
    }
  }

  public isMyMessage(msg: any): boolean {
    return msg.senderId === this._sharedService.userInfo.id;
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
