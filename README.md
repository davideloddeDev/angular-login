# 

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.3.

```typescript
import { NgModule } from '@angular/core';
import { AngularLoginModule, LoginConfig } from '@davideloddedev/angular-login';

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
export class AppModule { }omponent Library

Una libreria Angular completa e riutilizzabile per componenti di login con integrazione backend configurabile.

## 🚀 Caratteristiche

- ✅ **Completamente configurabile** tramite variabili pubbliche
- ✅ **Supporta temi** (light, dark, custom) 
- ✅ **Validazione form** integrata con feedback visivo
- ✅ **Gestione errori** e retry automatici
- ✅ **"Remember Me"** e "Password dimenticata"
- ✅ **Loading spinner** configurabile
- ✅ **Standalone component** per Angular 15+
- ✅ **TypeScript completo** con interfacce
- ✅ **Responsive design**
- ✅ **Accessibilità** seguendo le best practice
- ✅ **Pronto per GitHub** e npm

## 📦 Installazione e Utilizzo

### Da GitHub (Consigliato per sviluppo)

```bash
# Clona il repository
git clone https://github.com/davideloddeDev/angular-login.git

# Installa dipendenze
cd angular-login
npm install

# Build della libreria
npm run build

# Usa la libreria locale nei tuoi progetti
npm pack dist/angular-login-component
```

### Da GitHub Packages

```bash
# Configura npm per GitHub Packages
echo "@davideloddedev:registry=https://npm.pkg.github.com" >> ~/.npmrc

# Installa la libreria
npm install @davideloddedev/angular-login
```

### Da npm (quando pubblicato)

```bash
npm install @davideloddedev/angular-login
```

## 🛠 Integrazione nei Progetti

### Metodo 1: Standalone Component (Angular 15+)

```typescript
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
        title: 'La Mia App',
        theme: 'dark'
      } as LoginConfig
    }
  ],
  template: `
    <lib-login 
      [config]="additionalConfig"
      (loginSuccess)="onLoginSuccess($event)"
      (loginError)="onLoginError($event)">
    </lib-login>
  `
})
export class LoginPageComponent {
  additionalConfig = {
    showRememberMe: true,
    customCssClass: 'my-custom-style'
  };

  onLoginSuccess(response: any) {
    console.log('Login successful:', response);
    // Gestisci il redirect o altre azioni
  }

  onLoginError(error: any) {
    console.error('Login failed:', error);
    // Gestisci l'errore
  }
}
```

### Metodo 2: NgModule (Angular < 15)

```typescript
import { NgModule } from '@angular/core';
import { AngularLoginModule, LoginConfig } from '@your-org/angular-login-component';

const loginConfig: LoginConfig = {
  apiBaseUrl: 'https://your-api.com',
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

## ⚙️ Configurazione Backend

Il componente richiede un endpoint REST che:

### Riceve (POST)
```json
{
  "username": "user@example.com",
  "password": "password123",
  "rememberMe": true
}
```

### Risponde con
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

### In caso di errore
```json
{
  "success": false,
  "message": "Credenziali non valide",
  "error": "INVALID_CREDENTIALS"
}
```

## 🎨 Personalizzazione

### Configurazione completa

```typescript
const config: LoginConfig = {
  // API (obbligatorio)
  apiBaseUrl: 'https://api.myapp.com',
  loginEndpoint: '/v1/auth/login',
  
  // UI
  title: 'Accedi a MyApp',
  logoUrl: '/assets/images/logo.svg',
  showRememberMe: true,
  showForgotPassword: true,
  forgotPasswordUrl: 'https://myapp.com/forgot-password',
  
  // Campi personalizzati (per backend specifici)
  usernameLabel: 'Email',
  passwordLabel: 'Password',
  loginButtonText: 'Accedi',
  usernameField: 'email',    // Il backend si aspetta 'email' invece di 'username'
  passwordField: 'password',
  
  // Stili
  theme: 'dark',
  customCssClass: 'my-custom-login',
  
  // Comportamento
  redirectOnSuccess: '/dashboard',
  showLoadingSpinner: true,
  enableValidation: true,
  maxRetries: 5
};
```

### CSS personalizzato

```css
.my-custom-login {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
}

.my-custom-login .form-control {
  border-radius: 25px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.my-custom-login .btn-primary {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  border: none;
  border-radius: 25px;
}
```

## 🔧 Sviluppo e Build

### Setup sviluppo

```bash
# Clona e setup
git clone https://github.com/your-username/angular-login-component.git
cd angular-login-component
npm install

# Sviluppo con watch
npm run build:watch

# Test
npm run test

# Build produzione
npm run build

# Crea package per distribuzione
npm run pack
```

### Struttura del progetto

```
angular-login-component/
├── projects/
│   ├── angular-login-component/     # Libreria principale
│   │   ├── src/lib/
│   │   │   ├── login/              # Componente login
│   │   │   ├── models/             # Interfacce TypeScript
│   │   │   ├── auth.ts             # Servizio autenticazione
│   │   │   └── login.config.ts     # Configurazione
│   │   └── public-api.ts           # API pubblica
│   └── demo/                       # App demo (opzionale)
├── dist/                           # Build output
└── README.md
```

## 📄 API Reference

### Componente

```typescript
@Component({
  selector: 'lib-login'
})
export class LoginComponent {
  @Input() config?: Partial<LoginConfig>;
  @Input() customCssClass?: string;
  @Input() disabled?: boolean;
  
  @Output() loginSuccess = new EventEmitter<LoginResponse>();
  @Output() loginError = new EventEmitter<any>();
  @Output() forgotPassword = new EventEmitter<string>();
}
```

### Servizio

```typescript
@Injectable()
export class AuthService {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<any>;
  
  login(credentials: LoginCredentials): Observable<LoginResponse>;
  logout(): void;
  getToken(): string | null;
  isAuthenticated(): boolean;
  getRemainingAttempts(): number;
}
```

## 🚀 Pubblicazione

### Su GitHub Packages

```bash
# .npmrc
@your-org:registry=https://npm.pkg.github.com

# Build e publish
npm run build
npm publish dist/angular-login-component
```

### Su npm pubblico

```bash
npm run build
cd dist/angular-login-component
npm publish
```

## 📝 Licenza

MIT License - vedi [LICENSE](LICENSE) per i dettagli.

## 🤝 Contribuzione

1. Fork del repository
2. Crea un branch feature (`git checkout -b feature/amazing-feature`)
3. Commit delle modifiche (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

## 🐛 Supporto

- **Issues**: [GitHub Issues](https://github.com/your-username/angular-login-component/issues)
- **Documentazione**: [USAGE.md](projects/angular-login-component/USAGE.md)
- **Esempi**: Vedi cartella `projects/demo/`

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
