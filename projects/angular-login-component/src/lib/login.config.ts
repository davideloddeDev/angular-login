import { InjectionToken } from '@angular/core';
import { LoginConfig } from './models/login.interface';

export const LOGIN_CONFIG = new InjectionToken<LoginConfig>('login.config');

export const DEFAULT_LOGIN_CONFIG: LoginConfig = {
  apiBaseUrl: '',
  loginEndpoint: '/auth/login',
  title: 'Login',
  showRememberMe: true,
  showForgotPassword: true,
  usernameLabel: 'Username',
  passwordLabel: 'Password',
  loginButtonText: 'Login',
  usernameField: 'username',
  passwordField: 'password',
  theme: 'light',
  showLoadingSpinner: true,
  enableValidation: true,
  maxRetries: 3
};
