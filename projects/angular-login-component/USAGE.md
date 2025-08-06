# Angular Login Component

Un componente Angular riutilizzabile per il login con integrazione backend configurabile.

## 🚀 Caratteristiche

- ✅ Completamente configurabile tramite variabili pubbliche
- ✅ Supporta temi (light, dark, custom)
- ✅ Validazione form integrata
- ✅ Gestione errori e retry automatici
- ✅ Supporto per "Remember Me" e "Password dimenticata"
- ✅ Loading spinner configurabile
- ✅ Standalone component per Angular 15+
- ✅ TypeScript completo con interfacce
- ✅ Responsive design

## 📦 Installazione

### Da GitHub
```bash
npm install git+https://github.com/your-username/angular-login-component.git
```

### Da npm (quando pubblicato)
```bash
npm install @your-org/angular-login-component
```

## 🛠 Utilizzo

### Importazione del Modulo (Angular < 15)

```typescript
import { NgModule } from '@angular/core';
import { AngularLoginModule, LoginConfig } from '@your-org/angular-login-component';

const loginConfig: LoginConfig = {
  apiBaseUrl: 'https://api.example.com',
  loginEndpoint: '/auth/login',
  title: 'La Mia App',
  logoUrl: '/assets/logo.png'
};

@NgModule({
  imports: [
    AngularLoginModule.forRoot(loginConfig)
  ]
})
export class AppModule { }
```

### Standalone Component (Angular 15+)

```typescript
import { Component } from '@angular/core';
import { LoginComponent, LoginConfig, LOGIN_CONFIG } from '@your-org/angular-login-component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent],
  providers: [
    {
      provide: LOGIN_CONFIG,
      useValue: {
        apiBaseUrl: 'https://api.example.com',
        loginEndpoint: '/auth/login',
        title: 'La Mia App'
      } as LoginConfig
    }
  ],
  template: `
    <lib-login 
      [config]="loginConfig"
      (loginSuccess)="onLoginSuccess($event)"
      (loginError)="onLoginError($event)">
    </lib-login>
  `
})
export class LoginPageComponent {
  loginConfig = {
    theme: 'dark' as const,
    showRememberMe: true
  };

  onLoginSuccess(response: any) {
    console.log('Login successful:', response);
    // Redirect o altre azioni
  }

  onLoginError(error: any) {
    console.error('Login failed:', error);
  }
}
```

### Template semplice

```html
<lib-login 
  [config]="myConfig"
  (loginSuccess)="handleLoginSuccess($event)"
  (loginError)="handleLoginError($event)"
  (forgotPassword)="handleForgotPassword($event)">
</lib-login>
```

## ⚙️ Configurazione

### LoginConfig Interface

```typescript
interface LoginConfig {
  // Configurazione API (obbligatoria)
  apiBaseUrl: string;
  loginEndpoint?: string; // default: '/auth/login'
  
  // Configurazione UI
  title?: string; // default: 'Login'
  logoUrl?: string;
  showRememberMe?: boolean; // default: true
  showForgotPassword?: boolean; // default: true
  forgotPasswordUrl?: string;
  
  // Configurazione campi
  usernameLabel?: string; // default: 'Username'
  passwordLabel?: string; // default: 'Password'
  loginButtonText?: string; // default: 'Login'
  usernameField?: string; // nome campo nel payload - default: 'username'
  passwordField?: string; // nome campo nel payload - default: 'password'
  
  // Configurazione stili
  customCssClass?: string;
  theme?: 'light' | 'dark' | 'custom'; // default: 'light'
  
  // Configurazione comportamento
  redirectOnSuccess?: string; // URL di redirect automatico
  showLoadingSpinner?: boolean; // default: true
  enableValidation?: boolean; // default: true
  maxRetries?: number; // default: 3
}
```

## 📡 Integrazione Backend

### Formato richiesta (default)

```json
{
  "username": "user@example.com",
  "password": "password123",
  "rememberMe": true
}
```

### Formato risposta atteso

```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

## 🚀 Build e Distribuzione

### Build della libreria
```bash
npm run build
```

### Creazione package
```bash
npm run pack
```

### Pubblicazione su npm
```bash
npm publish dist/angular-login-component
```

## 📄 Licenza

Questo progetto è sotto licenza MIT.
