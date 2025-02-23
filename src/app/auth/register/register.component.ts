import { Component } from '@angular/core';
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
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, MaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        // email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['user', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }

      // Optionally, add more fields (e.g., confirm password, role) as needed
    );
  }

  ngOnInit(): void {}

  private passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    // if (this.registerForm.valid) {
    //   this.authService.register(this.registerForm.value).subscribe({
    //     next: (response: any) => {
    //       console.log('Registration successful:', response);
    //       // Redirect to login or dashboard after successful registration
    //       this.router.navigate(['/login']);
    //     },
    //     error: (error: any) => {
    //       console.error('Registration error:', error);
    //       this.errorMessage =
    //         error.error?.error || 'Registration failed. Please try again.';
    //     },
    //   });
    // }

    if (this.registerForm.invalid) {
      return;
    }

    const { username, email, password } = this.registerForm.value;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snackBar.open('Registration Successful!', 'Close', {
          duration: 3000, // Duration in milliseconds
          panelClass: ['snackbar-success'], // Optional: for custom styling
        });
        const userRole = this.registerForm.value.role;
        console.log('userRole', userRole);
        localStorage.setItem('userRole', JSON.stringify(userRole));
        this.router.navigate(['/login']); // Redirect to login on success
      },
      error: (error) => {
        this.snackBar.open('Registration failed!', 'Close', {
          duration: 3000, // Duration in milliseconds
          panelClass: ['snackbar-success'], // Optional: for custom styling
        });
        console.error('Registration error:', error);
        this.errorMessage = error.error?.message || 'Registration failed';
      },
    });
  }
}
