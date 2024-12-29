import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  public users: any;
  searchText = new FormControl('');
  public isLoading: boolean = false;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.searchText.valueChanges.pipe(debounceTime(800)).subscribe(text => {
      this.searchUser(text);
    })
  }

  private searchUser(searchText) {
    this._userService.searchUser(searchText).subscribe(res => {
      this.users = res;
    })
  }

  public sendRequest(friendId) {
    this.isLoading = true;
    this._userService.sendRequest(friendId).subscribe(res => {
      this.isLoading = false;
      this.searchUser(this.searchText.value);
    })
  }

}
