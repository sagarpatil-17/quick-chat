import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signin(data: any) {
    const url = `${API_BASE_URL}/api/auth/signin`;
    return this.http.post(url, data);
  }

  signup(data: any) {
    const url = `${API_BASE_URL}/api/auth/signup`;
    return this.http.post(url, data);
  }
}
