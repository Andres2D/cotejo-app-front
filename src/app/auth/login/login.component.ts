import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginRequest } from 'src/app/interfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import { PlayerService } from '../../services/player.service';
import { baseRating } from '../../constants/objects.contants';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'error' | 'warning' | 'info' = 'error';
  disableSubmit: boolean = false;
  auth2: any;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  $ngUnsubscribe: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private playerService: PlayerService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
      this.renderButton();
  }

  ngOnDestroy(): void {
    this.$ngUnsubscribe.next();
    this.$ngUnsubscribe.complete();
  }

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

  onSuccess(googleUser: any): void {
    console.log('Logged in as: ', googleUser.getBasicProfile());
    console.log(googleUser.getAuthResponse().id_token);
  }

  onFailure(err: any): void {
    console.log(err);
  }

  renderButton(): void {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 200,
      'height': 50,
      'longtitle': false,
      'theme': 'dark',
    });
    this.startApp();
  }

  async startApp(): Promise<void> {
    await this.authService.googleInit();
    this.auth2 = this.authService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.authService.loginPlayerGoogle(id_token)
            .pipe(takeUntil(this.$ngUnsubscribe))
            .subscribe({
              next: ({ok, newPlayer}) => {
                this.ngZone.run(() => {
                  if(ok) {
                    this.router.navigateByUrl('cotejo');
                    if(newPlayer){
                      this.playerService.postRating(baseRating)
                        .pipe(takeUntil(this.$ngUnsubscribe))
                        .subscribe(res => {
                          this.router.navigateByUrl('cotejo');
                        });
                    }
                  }else{
                    //TODO: show error
                  }
                })
              }
            });
        }, (error: any) => {
          console.log(error);
        });
  }
}
