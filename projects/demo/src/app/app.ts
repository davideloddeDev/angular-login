import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent, LoginConfig, LOGIN_CONFIG, LoginResponse, AuthService } from '../../../../projects/angular-login-component/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, HttpClientModule],
  providers: [
    {
      provide: LOGIN_CONFIG,
      useValue: {
        apiBaseUrl: 'http://localhost:3000/api',
        loginEndpoint: '/auth/login',
        title: 'Demo Login Component',
        logoUrl: '/assets/angular-logo.svg',
        theme: 'light',
        showRememberMe: true,
        showForgotPassword: true,
        forgotPasswordUrl: 'https://example.com/forgot-password',
        maxRetries: 3,
        usernameLabel: 'Email',
        passwordLabel: 'Password',
        loginButtonText: 'Accedi'
      } as LoginConfig
    },
    AuthService
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Angular Login Component Demo';

  lightConfig = {
    theme: 'light' as const,
    title: 'Light Theme Login',
    logoUrl: '/assets/angular-logo.svg',
    usernameLabel: 'Email',
    loginButtonText: 'Sign In'
  };

  darkConfig = {
    theme: 'dark' as const,
    title: 'Dark Theme Login',
    logoUrl: '/assets/angular-logo.svg',
    showRememberMe: false,
    usernameLabel: 'Username',
    loginButtonText: 'Login'
  };

  customConfig = {
    theme: 'custom' as const,
    title: 'Custom Theme Login',
    logoUrl: '/assets/angular-logo.svg',
    usernameLabel: 'User ID',
    passwordLabel: 'Secret Code',
    loginButtonText: 'Access System',
    showForgotPassword: false,
    customCssClass: 'demo-custom'
  };

  onLoginSuccess(response: LoginResponse) {
    console.log('Login successful:', response);
    alert(`Login successful! Welcome ${response.user?.name || 'User'}`);
  }

  onLoginError(error: any) {
    console.error('Login error:', error);
    const message = error.error?.message || error.message || 'Login failed';
    alert(`Login failed: ${message}`);
  }

  onForgotPassword(username: string) {
    console.log('Forgot password for:', username);
    alert(`Password reset request sent for: ${username}`);
  }
}
