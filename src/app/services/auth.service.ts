import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DashboardResponse,
  Item,
  policyDetails,
  PolicyResponse,
} from '../models/policy/policy.model';

import { JwtHelperService } from '@auth0/angular-jwt';

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

  // Create a new item
  createItem(item: Item): Observable<DashboardResponse> {
    return this.http.post<DashboardResponse>(`${this.baseUrl}/items`, item);
  }

  // Get all items
  getItems(): Observable<policyDetails> {
    return this.http.get<policyDetails>(`${this.baseUrl}/items`);
  }

  // Update an item by ID
  updateItem(
    itemId: string,
    item: Partial<Item>
  ): Observable<{ message: string; data: Item }> {
    return this.http.put<{ message: string; data: Item }>(
      `${this.baseUrl}/items/${itemId}`,
      item
    );
  }

  // Delete an item by ID
  deleteItem(itemId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/items/${itemId}`
    );
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    // return !!this.getToken();
    const helper = new JwtHelperService();
    const token = this.getToken();
    return token ? !helper.isTokenExpired(token) : false;
  }

  getUserRole(): string {
    const token = this.getToken();
    if (!token) return '';
    const decodedToken = new JwtHelperService().decodeToken(token);
    return decodedToken.role; // Ensure your backend includes "role" in JWT payload
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}'); // Example: { username: "shiva", role: "user" }
  }

  isAuthenticated(): boolean {
    const user = this.getUser();
    return user && user.role ? true : false;
  }
}
