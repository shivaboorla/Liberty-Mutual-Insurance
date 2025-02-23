import { Component } from '@angular/core';
import { PolicyResponse } from '../models/policy/policy.model';
import { AuthService } from '../services/auth.service';
import { MaterialModule } from '../shared/material.module';

@Component({
  selector: 'app-profile-details',
  imports: [MaterialModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent {
  message: string = '';
  policyData: any = null;
  error: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadPolicy();
  }

  loadPolicy(): void {
    this.authService.getPolicy().subscribe({
      next: (res: PolicyResponse) => {
        this.message = res.message;
        this.policyData = res.data;
      },
      error: (err) => {
        console.error('Policy load error:', err);
        this.error = err.error?.error || 'Failed to load policy details.';
      },
    });
  }
}
