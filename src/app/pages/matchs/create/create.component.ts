import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
      title: 'Players'
    }
  ];

  positions: string[] = ['gk','lb','rb','lf','rf'];

  currentStep: number = 0;
  loading: boolean = true;

  form: FormGroup = this.fb.group({
    home_formation: ['t', Validators.required],
    home_name: ['Liverpool', Validators.required],
    home_color: ['', Validators.required],
    away_formation: ['t', Validators.required],
    away_name: ['Chelsea', Validators.required],
    away_color: ['', Validators.required],
    home_players: this.fb.array([
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control(''),
    ]),
    away_players: this.fb.array([
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control(''),
    ])
  });

  @ViewChild('shieldPath') shieldPath!: ElementRef;

  get homeFormArray() {
    return this.form.get('home_players') as FormArray
  }

  get awayFormArray() {
    return this.form.get('away_players') as FormArray
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form.controls.home_players.patchValue([]);
    this.form.controls.away_players.patchValue([]);
    this.loadTime();
    console.log(this.form);
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
