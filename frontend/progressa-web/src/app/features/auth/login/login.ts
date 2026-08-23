import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  showPassword = false;
  isLoading = false;
  loginError = '';

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {

    // Clear previous error
    this.loginError = '';

    // Validate form
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    console.log('Attempting login:', email);

    const isAuthenticated = this.auth.login(email, password);

    console.log('Authentication result:', isAuthenticated);

    // Invalid credentials
    if (!isAuthenticated) {

      console.log('Invalid credentials');

      this.loginError =
        'Invalid email or password. Please check your credentials.';

      return;
    }

    // Successful login
    console.log('Login successful');

    this.isLoading = true;

    setTimeout(() => {

      this.isLoading = false;

      this.router.navigate(['/dashboard']);

    }, 800);
  }
}
