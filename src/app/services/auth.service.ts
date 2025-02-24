import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DashboardResponse,
  Item,
  policyDetails,
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
      `${this.baseUrl}/${itemId}`,
      item
    );
  }

  // Delete an item by ID
  deleteItem(itemId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${itemId}`);
  }
}
