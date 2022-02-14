import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignUpRequest } from 'src/app/interfaces/login.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { baseRating } from 'src/app/constants/objects.contants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnDestroy {

  disableSubmit: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'error' | 'warning' | 'info' = 'error';

  signUpForm: FormGroup = this.fb.group({
    name: ['Test', Validators.required],
    email: ['first@mail.com', [Validators.email, Validators.required]],
    nickname: ['', Validators.required],
    dorsal: [0, Validators.required],
    status: [''],
    password: ['123456', Validators.required],
    image: ['https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light', Validators.required]
  });

  $ngUnsubscribe: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private playerService: PlayerService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.$ngUnsubscribe.next();
    this.$ngUnsubscribe.complete();
  }

  signUp(): void {
    this.disableSubmit = true;
    if(this.signUpForm.valid) {
      const request: SignUpRequest = {
        name: this.signUpForm.value.name,
        nickname: this.signUpForm.value.nickname,
        number: this.signUpForm.value.dorsal,
        email: this.signUpForm.value.email,
        status: this.signUpForm.value.status,
        image: this.signUpForm.value.image,
        password: this.signUpForm.value.password
      }

      this.authService.signUp(request)
      .pipe(takeUntil(this.$ngUnsubscribe))
        .subscribe((res: any) => {
          if(res.ok) {
            this.playerService.postRating(baseRating)
              .pipe(takeUntil(this.$ngUnsubscribe))
              .subscribe(res => {
                this.router.navigateByUrl('cotejo');
              });
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
}
