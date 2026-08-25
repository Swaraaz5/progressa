import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly demoEmail = 'test@progressa.com';
  private readonly demoPassword = 'progressa123';

  private isAuthenticated = false;

  login(email: string, password: string): boolean {

    const isValid =
      email === this.demoEmail &&
      password === this.demoPassword;

    if (isValid) {
      this.isAuthenticated = true;
    }

    return isValid;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}

