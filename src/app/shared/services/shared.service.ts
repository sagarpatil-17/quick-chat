import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  // Getter for user_info
  public get userInfo(): any {
    return JSON.parse(localStorage.getItem('user_info'));
  }

  // Getter for isToken
  public get isToken(): boolean {
    return !!localStorage.getItem('token');
  }

}
