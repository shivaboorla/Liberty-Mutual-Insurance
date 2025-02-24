import { Component } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PoliciesComponent } from '../policies/policies.component';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MaterialModule,
    PoliciesComponent,
    RouterLink,
    ProfileDetailsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // @Output() menuToggled = new EventEmitter<boolean>();
  role: string = '';
  message: string = '';
  dashboardData: any = null;
  error: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // this.loadDashboard();
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        // Decode the token payload (this is a simple example; consider using a library for production)
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.role = payload.role || 'user';
        console.log(this.role);
      } catch (error) {
        console.error('Error decoding token', error);
        this.role = 'user';
      }
    }
  }

  // loadDashboard(): void {
  //   this.authService.getDashboard().subscribe({
  //     next: (res: DashboardResponse) => {
  //       this.message = res.message;
  //       this.dashboardData = res.data;
  //     },
  //     error: (err) => {
  //       console.error('Dashboard load error:', err);
  //       this.error = err.error?.error || 'Failed to load dashboard data.';
  //     },
  //   });
  // }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
