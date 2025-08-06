import { Component, Input, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginConfig, LoginCredentials, LoginResponse } from '../models/login.interface';
import { AuthService } from '../auth';
import { LOGIN_CONFIG, DEFAULT_LOGIN_CONFIG } from '../login.config';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  @Input() config?: Partial<LoginConfig>;
  @Input() customCssClass?: string;
  @Input() disabled?: boolean = false;
  
  @Output() loginSuccess = new EventEmitter<LoginResponse>();
  @Output() loginError = new EventEmitter<any>();
  @Output() forgotPassword = new EventEmitter<string>();

  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  finalConfig: LoginConfig;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(LOGIN_CONFIG) private injectedConfig: LoginConfig
  ) {
    this.finalConfig = { ...DEFAULT_LOGIN_CONFIG, ...this.injectedConfig };
    
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Merge delle configurazioni: default -> injected -> input
    this.finalConfig = {
      ...DEFAULT_LOGIN_CONFIG,
      ...this.injectedConfig,
      ...this.config
    };

    // Aggiorna i validatori se la validazione è disabilitata
    if (!this.finalConfig.enableValidation) {
      this.loginForm.get('username')?.clearValidators();
      this.loginForm.get('password')?.clearValidators();
      this.loginForm.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.disabled || this.isLoading) {
      return;
    }

    if (this.finalConfig.enableValidation && this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials: LoginCredentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      rememberMe: this.finalConfig.showRememberMe ? this.loginForm.value.rememberMe : undefined
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.loginSuccess.emit(response);
        
        // Redirect automatico se configurato
        if (this.finalConfig.redirectOnSuccess) {
          window.location.href = this.finalConfig.redirectOnSuccess;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || error.message || 'Errore durante il login';
        this.loginError.emit(error);
        
        // Reset del form se raggiunto il limite di tentativi
        if (this.authService.getRemainingAttempts() === 0) {
          this.loginForm.reset();
        }
      }
    });
  }

  onForgotPassword(): void {
    const username = this.loginForm.value.username || '';
    this.forgotPassword.emit(username);
    
    if (this.finalConfig.forgotPasswordUrl) {
      window.open(this.finalConfig.forgotPasswordUrl, '_blank');
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getter per facilitare l'accesso nei template
  get usernameControl() { return this.loginForm.get('username'); }
  get passwordControl() { return this.loginForm.get('password'); }
  get remainingAttempts() { return this.authService.getRemainingAttempts(); }
  
  // Metodi per la validazione
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${fieldName === 'username' ? this.finalConfig.usernameLabel : this.finalConfig.passwordLabel} è obbligatorio`;
      }
    }
    return '';
  }
}
