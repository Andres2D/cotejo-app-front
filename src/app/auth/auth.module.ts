import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class AuthModule { }
