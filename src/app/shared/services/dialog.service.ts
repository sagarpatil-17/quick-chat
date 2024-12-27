import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../api.config';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private http: HttpClient) { }

  createGroup(data: any) {
    const url = `${API_BASE_URL}/api/group/create`;
    return this.http.post(url, data);
  }
}
