import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-policies',
  imports: [MaterialModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent implements OnInit {
  userRole: string = '';
  policies: any[] = [];
  displayedColumns: string[] = [
    'policyNumber',
    'policyName',
    'policyType',
    'premiumAmount',
    'userId',
  ];
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || 'admin';
    console.log(' this.userRole', this.userRole);

    if (this.userRole === 'admin') {
      this.loadAdminPolicies();
    } else {
      this.loadUserPolicies();
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

  addPolicy(): void {}
  deletePolicy(data: string) {}
  editPolicy(data: string) {}

  // Method to check if the user is an Admin
  isAdmin(): boolean {
    return this.userRole === 'admin';
  }
}
