import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatchForm } from '../../../interfaces/match.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  formSteps: MatchForm[] = [
    {
      title: 'Home Team',
      control: 'home_color',
      buttonLabel: 'Continue'
    },
    {
      title: 'Away Team',
      control: 'away_color',
      buttonLabel: 'Continue'
    },
    {
      title: 'Players',
      buttonLabel: 'Create'
    },
    {
      title: 'Match Created',
      buttonLabel: 'Menu'
    }
  ];

  positions: string[] = ['gk','lb','rb','lf','rf'];

  currentStep: number = 2;
  loading: boolean = true;
  playersModal: boolean = true;

  form: FormGroup = this.fb.group({
    home_formation: ['t', Validators.required],
    home_name: ['Liverpool', Validators.required],
    home_color: ['', Validators.required],
    away_formation: ['t', Validators.required],
    away_name: ['Chelsea', Validators.required],
    away_color: ['', Validators.required],
    home_players: this.fb.array([
      this.fb.control({value: 'a', disabled: true}),
      this.fb.control({value: 'b', disabled: true}),
      this.fb.control({value: 'c', disabled: true}),
      this.fb.control({value: 'd', disabled: true}),
      this.fb.control({value: 'e', disabled: true}),
    ]),
    away_players: this.fb.array([
      this.fb.control({value: '', disabled: true}),
      this.fb.control({value: '', disabled: true}),
      this.fb.control({value: '', disabled: true}),
      this.fb.control({value: '', disabled: true}),
      this.fb.control({value: '', disabled: true}),
    ])
  });

  searchPlayer: FormControl = this.fb.control('');
  unsubscribe$: Subject<any> = new Subject();

  @ViewChild('shieldPath') shieldPath!: ElementRef;

  get homeFormArray() {
    return this.form.get('home_players') as FormArray
  }

  get awayFormArray() {
    return this.form.get('away_players') as FormArray
  }

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.form.controls.home_players.patchValue([]);
    this.form.controls.away_players.patchValue([]);
    this.loadTime();

    this.searchPlayer.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
        )
      .subscribe(val => {
        this.searchPlayerDB(val);
      });


    console.log(this.form);
  }

  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }

  loadTime(): void {
      this.loading = false;   
    // setTimeout(() => {
    // }, 2000);
  }

  updateShield(color: string): void {
    this.shieldPath.nativeElement.setAttribute('fill', color);
    this.form.controls[`${this.formSteps[this.currentStep].control}`].setValue(color)
  }

  nextStep(): void {  
    this.loading = true;
    this.loadTime();
    if(this.currentStep === 3) {
      this.router.navigateByUrl('cotejo/match');
    }else{
      this.currentStep = this.currentStep + 1;
    }
    console.log(this.form.value);
  }

  openPlayerModal(i: number, control: string): void {
    if(control === 'home_players') {
      console.log(this.homeFormArray.controls[i]);
    }else {
      console.log(this.homeFormArray.controls[i]);
    }
    
    this.playersModal = true;
  }

  closePlayerModal(): void {
    this.playersModal = false;
    this.searchPlayer.reset();
  }

  addPlayer(): void {
  }  

  searchPlayerDB(query: string): void {
    console.log(query);
  }
}
