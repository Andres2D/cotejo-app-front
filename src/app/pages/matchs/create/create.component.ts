import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { PlayerService } from '../../../services/player.service';
import { Player } from '../../../interfaces/player.interface';
import { positions, formSteps } from './create.constants';
import { MatchService } from '../../../services/match.service';
import { CreateTeamRequest, TeamPlayer } from '../../../interfaces/team.interface';
import { TeamService } from '../../../services/team.service';
import { CreateMatch } from '../../../interfaces/match.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  datalistPlayers: Player[] = [];
  readonly positions = positions;
  readonly formSteps = formSteps;

  currentStep: number = 0;
  loading: boolean = true;
  playersModal: boolean = false;

  form: FormGroup = this.fb.group({
    home_formation: ['t', Validators.required],
    home_name: ['', Validators.required],
    home_color: ['', Validators.required],
    away_formation: ['t', Validators.required],
    away_name: ['', Validators.required],
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
    ]),
    date: ['', Validators.required],
    location: ['', Validators.required]
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
    private playerService: PlayerService,
    private matchService: MatchService,
    private teamService: TeamService) { }

  ngOnInit(): void {
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
    this.loading = true;
    this.loadTime();

    if(this.currentStep === 4) {
      this.router.navigateByUrl('cotejo/match');
    }else if(this.currentStep === 3) {
      this.createMatch();
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
    this.currentSearchControl.get('id')
      ?.setValue(this.datalistPlayers
          .filter(pl => pl.name === this.searchPlayer.value)[0]._id);
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

  createMatch(): void {
    console.log(this.form.value);
    
    const { 
      home_color,
      home_formation, 
      home_name,
      away_color,
      away_formation,
      away_name,
      date,
      location
    } = this.form.value;
  
    const homeTeamReq: CreateTeamRequest = {
      name: home_name,
      formation: home_formation,
      color: home_color
    }

    const awayTeamReq: CreateTeamRequest = {
      name: away_name,
      formation: away_formation,
      color: away_color
    }

    const createHome = this.teamService.postTeam(homeTeamReq);
    const createAway = this.teamService.postTeam(awayTeamReq);

    combineLatest([createHome, createAway])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(teams => {
        const [home, away] = teams;
        const homeTeamId = home.team._id;
        const awayTeamId = away.team._id;

        const teamPlayerHomeRequest = this.getRequestData(homeTeamId, 'home_players');
        const teamPlayerAwayRequest = this.getRequestData(awayTeamId, 'away_players');

        const createHomeTeamPlayers = this.playerService.postTeamPlayer(teamPlayerHomeRequest);
        const createAwayTeamPlayers = this.playerService.postTeamPlayer(teamPlayerAwayRequest);

        combineLatest([createHomeTeamPlayers, createAwayTeamPlayers])
          .pipe(takeUntil(this.unsubscribe$))
            .subscribe();
        
        const createMatchRequest: CreateMatch = {
          date,
          location,
          home_team: homeTeamId,
          away_team: awayTeamId
        }

        this.matchService.createMatch(createMatchRequest)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(res => {
            console.log(res);
            console.log('Match created');
            this.currentStep = this.currentStep + 1;
          });
      });
  }

  getRequestData(team: string, control: string): TeamPlayer[] {
    const teamPlayers: TeamPlayer[] = [];

    this.form.get(control)?.value.forEach(({id}: any, i: number) => {
        const teamPlayer: TeamPlayer = {
          isCaptain: false,
          player: id,
          position: this.positions[i].toUpperCase(),
          team
        };
        teamPlayers.push(teamPlayer);
    });

    return teamPlayers;
  }
}
