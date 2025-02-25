import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Item } from '../models/policy/policy.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-policies',
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent implements OnInit {
  items: Item[] = [];
  message: string = '';
  error: string = '';
  userRole: string = '';
  displayedColumns: string[] = [
    'policyNumber',
    'customerId',
    'policyType',
    'status',
    'actions',
  ];
  newPolicyNumber: string = '';
  newItemID: string = '';
  newItemType: string = '';
  newItemStatus: string = '';
  // Add variables for updating an item
  editItem: Item | null = null;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || 'admin';
    console.log(' this.userRole', this.userRole);
    this.decodeToken();
  }

  decodeToken(): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userRole = payload.role || 'user';
      } catch (err) {
        console.error('Error decoding token:', err);
        this.userRole = 'user';
      }
    }
  }

  addItem(): void {
    // if (!this.newPolicyNumber.trim()) return;
    const newItem: Item = {
      policyNumber: this.newPolicyNumber,
      customerId: this.newItemID,
      policyType: this.newItemType,
      status: this.newItemStatus,
    };
    this.authService.createItem(newItem).subscribe({
      next: (res) => {
        this.items.push(res.data);
        this.newPolicyNumber = '';
        this.newItemID = '';
        this.newItemType = '';
        this.newItemStatus = '';
      },
      error: (err) => {
        console.error('Error creating item:', err);
      },
    });
  }

  // Method to check if the user is an Admin
  isAdmin(): boolean {
    return this.userRole === 'admin';
  }
}
