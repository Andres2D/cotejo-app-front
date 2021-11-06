import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email: ['first@mail.com', Validators.email],
    password: ['123456']
  });

  constructor(private fb: FormBuilder) { }

  login() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
