import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchForm } from '../../../interfaces/match.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

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

  updateShield(color: string): void {
    this.shieldPath.nativeElement.setAttribute('fill', color);
    this.form.controls[`${this.formSteps[this.currentStep].control}`].setValue(color)
  }

  nextStep(): void {  
    this.currentStep = this.currentStep + 1;
    console.log(this.form.value);
  }
}
