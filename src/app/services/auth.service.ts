import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DashboardResponse,
  PolicyResponse,
} from '../models/policy/policy.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // register(user: {
  //   username: string;
  //   email: string;
  //   password: string;
  // }): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/register`, user);
  // }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getDashboard(): Observable<DashboardResponse> {
    // return this.http.get(`${this.baseUrl}/dashboard`, message, data);
    return this.http.get<DashboardResponse>(`${this.baseUrl}/dashboard`);
  }

  getPolicy(): Observable<PolicyResponse> {
    return this.http.get<PolicyResponse>(`${this.baseUrl}/policy`);
  }
}
