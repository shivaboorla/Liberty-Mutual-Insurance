import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the Reactive Form with validators
  private initializeForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Assuming the token is returned as response.token
        localStorage.setItem('jwtToken', response.token);
        this.snackBar.open('Login Successful!', 'Close', {
          duration: 3000, // Duration in milliseconds
          panelClass: ['snackbar-success'], // Optional: for custom styling
        });
        // Navigate to the dashboard after successful login
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.snackBar.open('Login failed!', 'Close', {
          duration: 3000, // Duration in milliseconds
          panelClass: ['snackbar-success'], // Optional: for custom styling
        });
        this.errorMessage =
          error.error?.error || 'Login failed. Please try again.';
      },
    });
  }
}
