import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../api.config';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getMyGroups() {
    const url = `${API_BASE_URL}/api/group/my`;
    return this.http.get(url);
  }

  getGroupMessage(groupId) {
    const url = `${API_BASE_URL}/api/group/messages/${groupId}`;
    return this.http.get(url);
  }
}
