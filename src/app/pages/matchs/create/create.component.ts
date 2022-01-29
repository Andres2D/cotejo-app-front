import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchForm } from '../../../interfaces/match.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formSteps: MatchForm[] = [
    {
      title: 'Home Team',
      control: 'home_color'
    },
    {
      title: 'Away Team',
      control: 'away_color'
    },
    {
      title: 'Home Players'
    },
    {
      title: 'Away Players'
    }
  ];

  currentStep: number = 0;
  loading: boolean = true;

  form: FormGroup = this.fb.group({
    home_formation: ['t', Validators.required],
    home_name: ['', Validators.required],
    home_color: ['', Validators.required],
    away_formation: ['t', Validators.required],
    away_name: ['', Validators.required],
    away_color: ['', Validators.required],
  });

  @ViewChild('shieldPath') shieldPath!: ElementRef;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadTime();
  }

  loadTime(): void {
    setTimeout(() => {
      this.loading = false;   
    }, 2000);
  }

  updateShield(color: string): void {
    this.shieldPath.nativeElement.setAttribute('fill', color);
    this.form.controls[`${this.formSteps[this.currentStep].control}`].setValue(color)
  }

  nextStep(): void {  
    this.loading = true;
    this.loadTime();
    this.currentStep = this.currentStep + 1;
    console.log(this.form.value);
  }
}
