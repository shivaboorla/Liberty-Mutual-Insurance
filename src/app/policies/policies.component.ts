import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { Router, RouterLink } from '@angular/router';
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
  policies: any[] = [];
  displayedColumns: string[] = ['policyNumber', 'customerId', 'type', 'status'];
  newPolicyNumber: string = '';
  newItemID: string = '';
  newItemType: string = '';
  newItemStatus: string = '';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || 'admin';
    console.log(' this.userRole', this.userRole);

    if (this.userRole === 'admin') {
      this.loadAdminPolicies();
    } else {
      this.loadUserPolicies();
    }
    this.decodeToken();
    this.loadItems();
  }

  decodeToken(): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userRole = payload.role || 'guest';
      } catch (err) {
        console.error('Error decoding token:', err);
        this.userRole = 'guest';
      }
    }
  }

  loadUserPolicies(): void {
    // Mock data for a regular user
    this.policies = [
      {
        policyNumber: 'P123',
        policyName: 'Health Plan',
        policyType: 'Health',
        premiumAmount: 5000,
        userId: 'U1',
      },
      {
        policyNumber: 'P124',
        policyName: 'Car Insurance',
        policyType: 'Vehicle',
        premiumAmount: 3000,
        userId: 'U2',
      },
    ];
  }

  loadAdminPolicies(): void {
    // Mock data for admin
    this.policies = [
      {
        policyNumber: 'P123',
        policyName: 'Health Plan',
        policyType: 'Health',
        premiumAmount: 5000,
        userId: 'U1',
      },
      {
        policyNumber: 'P124',
        policyName: 'Car Insurance',
        policyType: 'Vehicle',
        premiumAmount: 3000,
        userId: 'U2',
      },
      {
        policyNumber: 'P125',
        policyName: 'Home Insurance',
        policyType: 'Home',
        premiumAmount: 2000,
        userId: 'U3',
      },
    ];
  }

  loadItems(): void {
    this.authService.getItems().subscribe({
      next: (res) => {
        this.message = res.message;
        this.items = res.data;
      },
      error: (err) => {
        console.error('Error loading items:', err);
        this.error = err.error?.error || 'Failed to load items.';
      },
    });
  }

  addItem(): void {
    if (!this.newPolicyNumber.trim()) return;
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

  addPolicy(): void {}
  deletePolicy(data: string) {}
  editPolicy(data: string) {}

  // Method to check if the user is an Admin
  isAdmin(): boolean {
    return this.userRole === 'admin';
  }
}
