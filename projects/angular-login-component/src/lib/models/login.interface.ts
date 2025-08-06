export interface LoginConfig {
  // Configurazione API
  apiBaseUrl: string;
  loginEndpoint?: string;
  
  // Configurazione UI
  title?: string;
  logoUrl?: string;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  forgotPasswordUrl?: string;
  
  // Configurazione campi
  usernameLabel?: string;
  passwordLabel?: string;
  loginButtonText?: string;
  usernameField?: string;
  passwordField?: string;
  
  // Configurazione stili
  customCssClass?: string;
  theme?: 'light' | 'dark' | 'custom';
  
  // Configurazione comportamento
  redirectOnSuccess?: string;
  showLoadingSpinner?: boolean;
  enableValidation?: boolean;
  maxRetries?: number;
}

export interface LoginRequest {
  [key: string]: any;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: any;
  message?: string;
  error?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}
