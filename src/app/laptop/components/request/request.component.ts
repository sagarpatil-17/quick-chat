import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-request',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent {
  public users: any[] = [];
  searchText = new FormControl('');
  public isLoading: boolean = false;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getRequest()
  }

  private getRequest() {
    this._userService.getRequest().subscribe((res: any[]) => {
      this.users = res;
    })
  }

  public updateRequest(user, status) {
    const requestData = {
      status: status,
      friendId: user.senderId
    }

    this.isLoading = true;
    this._userService.updateRequest(user?.id, requestData).subscribe(() => {
      // this.users?.filter(item => item.id != user?.id);
      this.getRequest();
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    })
  }


}
