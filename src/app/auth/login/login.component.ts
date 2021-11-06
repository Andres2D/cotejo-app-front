import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginRequest } from 'src/app/interfaces/login.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'error' | 'warning' | 'info' = 'error';
  disableSubmit: boolean = false;

  loginForm: FormGroup = this.fb.group({
    email: ['first@mail.com', [Validators.email, Validators.required]],
    password: ['123456', Validators.required]
  });

  $ngUnsubscribe: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) { }

  login() {
    this.disableSubmit = true;
    if(this.loginForm.valid) {
      const request: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.authService.login(request)
      .pipe(takeUntil(this.$ngUnsubscribe))
        .subscribe(res => {
          if(res.ok) {
            this.router.navigateByUrl('cotejo');
          }else{
            this.showAlert = true;
            this.alertMessage = res.msg;
            this.alertType = 'error';
          }
          this.disableSubmit = false;
        });
    }
  }

  close(): void {
    this.showAlert = false;
  }

  ngOnDestroy(): void {
    this.$ngUnsubscribe.next();
    this.$ngUnsubscribe.complete();
  }
}
