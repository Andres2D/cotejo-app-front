import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  disableSubmit: boolean = false;

  signUpForm: FormGroup = this.fb.group({
    name: ['Test', Validators.required],
    email: ['first@mail.com', [Validators.email, Validators.required]],
    nickname: ['', Validators.required],
    dorsal: [0, Validators.required],
    status: [''],
    password: ['123456', Validators.required],
    image: ['https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light', Validators.required]
  });

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signUp(): void {

  }
}
