import { Component, NgZone, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginRequest } from 'src/app/interfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import { PlayerService } from '../../services/player.service';
import { baseRating } from '../../constants/objects.contants';
import { options } from '../../constants/google-button.constants';

declare let google: any;
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

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  $ngUnsubscribe: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private playerService: PlayerService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef) { }

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
    }else {
      this.disableSubmit = false;
    }
  }

  close(): void {
    this.showAlert = false;
    this.cdr.detectChanges();
  }

  renderButton(): void {
    google.accounts.id.initialize({
      client_id: '756127147061-fqhrqhmm7shfavmjr9n95e3ade8n6qsk.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this)
    });
    google.accounts.id.renderButton(
      document.getElementById("g_id_onload"), 
      {...options, size: window.innerWidth <= 420 ? 'medium' : 'large'} 
    );
    google.accounts.id.prompt(); 
  }

  handleCredentialResponse(res: any): void {
    const id_token = res.credential;
    this.authService.loginPlayerGoogle(id_token)
      .pipe(takeUntil(this.$ngUnsubscribe))
      .subscribe({
        next: ({ok, msg, newPlayer}) => {
          if(ok) {
            this.ngZone.run(() => {
              this.router.navigateByUrl('cotejo');
              if(newPlayer){
                this.playerService.postRating(baseRating)
                  .pipe(takeUntil(this.$ngUnsubscribe))
                  .subscribe(res => {
                    this.router.navigateByUrl('cotejo');
                  });
              }
            });
          }else {
            this.showAlert = true;
            this.alertMessage = msg;
            this.alertType = 'error';
            this.cdr.detectChanges();
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }
}
