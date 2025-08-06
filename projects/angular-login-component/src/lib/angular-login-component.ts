import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login';
import { AuthService } from './auth';
import { LoginConfig } from './models/login.interface';
import { LOGIN_CONFIG, DEFAULT_LOGIN_CONFIG } from './login.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class AngularLoginModule {
  static forRoot(config: LoginConfig): ModuleWithProviders<AngularLoginModule> {
    return {
      ngModule: AngularLoginModule,
      providers: [
        {
          provide: LOGIN_CONFIG,
          useValue: { ...DEFAULT_LOGIN_CONFIG, ...config }
        },
        AuthService
      ]
    };
  }

  static forChild(config?: Partial<LoginConfig>): ModuleWithProviders<AngularLoginModule> {
    return {
      ngModule: AngularLoginModule,
      providers: config ? [
        {
          provide: LOGIN_CONFIG,
          useValue: { ...DEFAULT_LOGIN_CONFIG, ...config }
        }
      ] : []
    };
  }
}

// Export standalone component per Angular 15+
export { LoginComponent };
