import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent, LoginConfig, LOGIN_CONFIG, LoginResponse } from '../../projects/angular-login-component/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  providers: [
    {
      provide: LOGIN_CONFIG,
      useValue: {
        apiBaseUrl: 'http://localhost:3000/api',
        loginEndpoint: '/auth/login',
        title: 'Demo Login',
        logoUrl: '/assets/logo.png',
        theme: 'light',
        showRememberMe: true,
        showForgotPassword: true,
        forgotPasswordUrl: 'https://example.com/forgot-password',
        maxRetries: 3
      } as LoginConfig
    }
  ],
  template: `
    <div class="app-container">
      <h1>Angular Login Component Demo</h1>
      
      <div class="demo-section">
        <h2>Light Theme</h2>
        <lib-login 
          [config]="lightConfig"
          (loginSuccess)="onLoginSuccess($event)"
          (loginError)="onLoginError($event)"
          (forgotPassword)="onForgotPassword($event)">
        </lib-login>
      </div>

      <div class="demo-section">
        <h2>Dark Theme</h2>
        <lib-login 
          [config]="darkConfig"
          [customCssClass]="'demo-dark'"
          (loginSuccess)="onLoginSuccess($event)"
          (loginError)="onLoginError($event)">
        </lib-login>
      </div>

      <div class="demo-section">
        <h2>Custom Theme</h2>
        <lib-login 
          [config]="customConfig"
          [customCssClass]="'demo-custom'"
          (loginSuccess)="onLoginSuccess($event)"
          (loginError)="onLoginError($event)">
        </lib-login>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .demo-section {
      margin: 3rem 0;
      padding: 2rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }

    .demo-section h2 {
      margin-top: 0;
      color: #333;
    }

    .demo-dark {
      background-color: #1a1a1a;
    }

    .demo-custom {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .demo-custom .form-control {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      color: white;
    }

    .demo-custom .form-control::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  `]
})
export class AppComponent {
  title = 'angular-login-demo';

  lightConfig = {
    theme: 'light' as const,
    title: 'Light Login',
    usernameLabel: 'Email',
    loginButtonText: 'Sign In'
  };

  darkConfig = {
    theme: 'dark' as const,
    title: 'Dark Login',
    showRememberMe: false,
    usernameLabel: 'Username',
    loginButtonText: 'Login'
  };

  customConfig = {
    theme: 'custom' as const,
    title: 'Custom Login',
    usernameLabel: 'User ID',
    passwordLabel: 'Secret',
    loginButtonText: 'Access',
    showForgotPassword: false
  };

  onLoginSuccess(response: LoginResponse) {
    console.log('Login successful:', response);
    alert('Login successful! Check console for details.');
  }

  onLoginError(error: any) {
    console.error('Login error:', error);
    alert('Login failed! Check console for details.');
  }

  onForgotPassword(username: string) {
    console.log('Forgot password for:', username);
    alert(`Forgot password request for: ${username}`);
  }
}
