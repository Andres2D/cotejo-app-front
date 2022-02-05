import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatchForm } from '../../../interfaces/match.interface';
import { PlayerService } from '../../../services/player.service';
import { Player } from '../../../interfaces/player.interface';

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
  datalistPlayers: Player[] = [];

  currentStep: number = 0;
  loading: boolean = true;
  playersModal: boolean = false;

  form: FormGroup = this.fb.group({
    home_formation: ['t', Validators.required],
    home_name: ['Liverpool', Validators.required],
    home_color: ['', Validators.required],
    away_formation: ['t', Validators.required],
    away_name: ['Chelsea', Validators.required],
    away_color: ['', Validators.required],
    home_players: this.fb.array([
      this.fb.group({
        id: [''],
        name: [{value: '', disabled: true}],
      }),
      this.fb.group({
        id: [''],
        name: [{value: '', disabled: true}],
      }),
      this.fb.group({
        id: [''],
        name: [{value: '', disabled: true}],
      }),
      this.fb.group({
        id: [''],
        name: [{value: '', disabled: true}],
      }),
      this.fb.group({
        id: [''],
        name: [{value: '', disabled: true}],
      })
    ]),
    away_players: this.fb.array([
      this.fb.group({
        id: [''],
        name: [{value: '', disabled: true}],
      }),
      this.fb.group({
        id: [''],
        name: [{value: '', disabled: true}],
      }),
      this.fb.group({
        id: [''],
        name: [{value: '', disabled: true}],
      }),
      this.fb.group({
        id: [''],
        name: [{value: '', disabled: true}],
      }),
      this.fb.group({
        id: [''],
        name: [{value: '', disabled: true}],
      })
    ])
  });

  searchPlayer: FormControl = this.fb.control('');
  currentSearchControl?: any;
  unsubscribe$: Subject<any> = new Subject();

  @ViewChild('shieldPath') shieldPath!: ElementRef;

  get homeFormArray() {
    return this.form.get('home_players') as FormArray
  }

  get awayFormArray() {
    return this.form.get('away_players') as FormArray
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.form.controls.home_players.patchValue([]);
    this.form.controls.away_players.patchValue([]);
    this.loadTime();    

    //TODO: Fix double request on 
    this.searchPlayer.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((val: string) => {
        if(val?.length > 2) {
          this.searchPlayerDB(val);
        }
      });
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
    console.log(this.form.value);
    
    this.loading = true;
    this.loadTime();
    if(this.currentStep === 3) {
      this.router.navigateByUrl('cotejo/match');
    }else{
      this.currentStep = this.currentStep + 1;
    }
  }

  openPlayerModal(i: number, control: string): void {
    if(control === 'home_players') {
      this.currentSearchControl = this.homeFormArray.controls[i];
    }else {
      this.currentSearchControl = this.awayFormArray.controls[i];
    }
    
    this.playersModal = true;
  }

  closePlayerModal(): void {
    this.playersModal = false;
    this.datalistPlayers = [];
    this.searchPlayer.reset();
  }

  addPlayer(): void {
    this.currentSearchControl.get('name')?.setValue(this.searchPlayer.value);
    this.currentSearchControl.get('id')?.setValue(this.datalistPlayers.filter(pl => pl.name === this.searchPlayer.value)[0]._id);
    this.closePlayerModal();
  }  

  searchPlayerDB(query: string): void {
    if(!query) return;

    this.playerService.searchPlayer(query)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({players}) => {
        this.datalistPlayers = [];
        players.forEach(player => {
          this.datalistPlayers.push(player);
        });
      })
  }
}
