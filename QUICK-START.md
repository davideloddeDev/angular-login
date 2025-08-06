# Come utilizzare Angular Login Component nei tuoi progetti

## 🚀 Installazione Rapida

### Metodo 1: Da GitHub Packages (Raccomandato)

```bash
# Configura npm per GitHub Packages (una volta sola)
echo "@davideloddedev:registry=https://npm.pkg.github.com" >> ~/.npmrc

# Installa la libreria
npm install @davideloddedev/angular-login
```

### Metodo 2: Da Git direttamente

```bash
npm install git+https://github.com/davideloddeDev/angular-login.git
```

## 📋 Setup Veloce

### 1. App Module (Angular tradizionale)

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularLoginModule, LoginConfig } from '@davideloddedev/angular-login';

const loginConfig: LoginConfig = {
  apiBaseUrl: 'https://your-api.com',
  loginEndpoint: '/auth/login',
  title: 'La Tua App',
  theme: 'light'
};

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularLoginModule.forRoot(loginConfig)
  ],
  // ...
})
export class AppModule { }
```

### 2. Standalone Component (Angular 15+)

```typescript
// login-page.component.ts
import { Component } from '@angular/core';
import { LoginComponent, LoginConfig, LOGIN_CONFIG } from '@davideloddedev/angular-login';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent],
  providers: [
    {
      provide: LOGIN_CONFIG,
      useValue: {
        apiBaseUrl: 'https://your-api.com',
        loginEndpoint: '/auth/login',
        title: 'La Tua App'
      } as LoginConfig
    }
  ],
  template: `
    <lib-login 
      (loginSuccess)="onSuccess($event)"
      (loginError)="onError($event)">
    </lib-login>
  `
})
export class LoginPageComponent {
  onSuccess(response: any) {
    console.log('Login ok!', response);
    // Redirect o altre azioni
  }
  
  onError(error: any) {
    console.error('Login fallito:', error);
  }
}
```

## ⚙️ Configurazioni Comuni

### Configurazione Completa

```typescript
const config: LoginConfig = {
  // API (obbligatorio)
  apiBaseUrl: 'https://api.myapp.com',
  loginEndpoint: '/v1/auth/login',
  
  // UI
  title: 'Accedi a MyApp',
  logoUrl: '/assets/logo.png',
  theme: 'dark', // 'light' | 'dark' | 'custom'
  
  // Etichette
  usernameLabel: 'Email',
  passwordLabel: 'Password',
  loginButtonText: 'Accedi',
  
  // Funzionalità
  showRememberMe: true,
  showForgotPassword: true,
  forgotPasswordUrl: 'https://myapp.com/reset',
  
  // Comportamento
  maxRetries: 3,
  redirectOnSuccess: '/dashboard'
};
```

### Solo le Opzioni Essenziali

```typescript
const config: LoginConfig = {
  apiBaseUrl: 'https://api.myapp.com', // OBBLIGATORIO
  title: 'Il Mio Login',
  theme: 'light'
};
```

## 🎨 Personalizzazione CSS

```css
/* Sovrascrivi gli stili del componente */
.my-custom-login {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
}

.my-custom-login .form-control {
  border-radius: 25px;
}

.my-custom-login .btn-primary {
  background: #ff6b6b;
  border: none;
}
```

```typescript
// Usa la classe CSS custom
<lib-login [customCssClass]="'my-custom-login'"></lib-login>
```

## 🔐 Integrazione Backend

Il tuo backend deve gestire:

**Richiesta POST a `/auth/login`:**
```json
{
  "username": "user@example.com",
  "password": "password123",
  "rememberMe": true
}
```

**Risposta di successo:**
```json
{
  "success": true,
  "token": "jwt-token-qui",
  "user": {
    "id": 1,
    "name": "Mario Rossi",
    "email": "user@example.com"
  }
}
```

**Risposta di errore:**
```json
{
  "success": false,
  "message": "Credenziali non valide"
}
```

## 🛠 Gestione Stato Autenticazione

```typescript
import { AuthService } from '@davideloddedev/angular-login';

@Component({...})
export class MyComponent {
  constructor(private authService: AuthService) {
    // Osserva lo stato di login
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        console.log('Utente loggato!');
      }
    });
    
    // Ottieni info utente
    this.authService.user$.subscribe(user => {
      console.log('Utente:', user);
    });
  }
  
  logout() {
    this.authService.logout();
  }
  
  getToken() {
    return this.authService.getToken();
  }
}
```

## 🐛 Troubleshooting

### Errore: "Cannot resolve dependency"

```bash
# Installa le peer dependencies
npm install @angular/common @angular/core @angular/forms
```

### Errore: "Module not found"

```bash
# Verifica di aver configurato npm per GitHub Packages
echo "@davideloddedev:registry=https://npm.pkg.github.com" >> ~/.npmrc
```

### Errore CORS durante il login

Configura il tuo backend per accettare richieste dal frontend:

```javascript
// Express.js esempio
app.use(cors({
  origin: 'http://localhost:4200'
}));
```

## 📞 Supporto

- **Repository**: https://github.com/davideloddeDev/angular-login
- **Issues**: https://github.com/davideloddeDev/angular-login/issues
- **Demo Live**: https://davideloddedev.github.io/angular-login

## 🔄 Aggiornamenti

```bash
# Controlla nuove versioni
npm outdated @davideloddedev/angular-login

# Aggiorna alla versione più recente
npm update @davideloddedev/angular-login
```
