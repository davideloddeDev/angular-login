import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginConfig, LoginCredentials, LoginResponse, LoginRequest } from './models/login.interface';
import { LOGIN_CONFIG, DEFAULT_LOGIN_CONFIG } from './login.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly config: LoginConfig;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<any>(null);
  private attemptsCounter = 0;

  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  public user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(LOGIN_CONFIG) config: LoginConfig
  ) {
    this.config = { ...DEFAULT_LOGIN_CONFIG, ...config };
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('auth_user');
    
    if (token && user) {
      this.isLoggedInSubject.next(true);
      this.userSubject.next(JSON.parse(user));
    }
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    if (this.attemptsCounter >= (this.config.maxRetries || 3)) {
      return throwError(() => new Error('Massimo numero di tentativi raggiunto'));
    }

    const loginData: LoginRequest = {
      [this.config.usernameField || 'username']: credentials.username,
      [this.config.passwordField || 'password']: credentials.password
    };

    if (credentials.rememberMe !== undefined) {
      loginData['rememberMe'] = credentials.rememberMe;
    }

    const url = `${this.config.apiBaseUrl}${this.config.loginEndpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.attemptsCounter++;

    return this.http.post<LoginResponse>(url, loginData, { headers }).pipe(
      tap(response => {
        if (response.success) {
          this.handleSuccessfulLogin(response);
          this.attemptsCounter = 0; // Reset counter on success
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  private handleSuccessfulLogin(response: LoginResponse): void {
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    if (response.user) {
      localStorage.setItem('auth_user', JSON.stringify(response.user));
      this.userSubject.next(response.user);
    }

    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.isLoggedInSubject.next(false);
    this.userSubject.next(null);
    this.attemptsCounter = 0;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUser(): any {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  resetAttempts(): void {
    this.attemptsCounter = 0;
  }

  getRemainingAttempts(): number {
    return Math.max(0, (this.config.maxRetries || 3) - this.attemptsCounter);
  }
}
