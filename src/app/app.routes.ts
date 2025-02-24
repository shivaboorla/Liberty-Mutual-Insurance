import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from './guards/role.guard';
import { PoliciesComponent } from './policies/policies.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'policy-details',
        component: PoliciesComponent,
      },
      {
        path: 'profile',
        component: ProfileDetailsComponent,
      },
    ],
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' }, // Adjust expected role as needed
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
