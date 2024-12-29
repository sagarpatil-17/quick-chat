import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateUser(userId, data) {
    const url = `${API_BASE_URL}/api/user/update/${userId}`;
    return this.http.patch(url, data);
  }

  searchUser(searchText) {
    const url = `${API_BASE_URL}/api/user/search/${searchText}`;
    return this.http.get(url);
  }

  sendRequest(friendId) {
    const url = `${API_BASE_URL}/api/user/request/${friendId}`;
    return this.http.post(url, {});
  }

  getRequest() {
    const url = `${API_BASE_URL}/api/user/requests`;
    return this.http.get(url);
  }

  updateRequest(id, data) {
    const url = `${API_BASE_URL}/api/user/request/${id}`;
    return this.http.patch(url, data);
  }

  getFriendList() {
    const url = `${API_BASE_URL}/api/user/friendList`;
    return this.http.get(url);
  }
}
