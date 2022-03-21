import { Component, ViewChild, ElementRef, OnInit, OnDestroy, AfterViewChecked, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { PlayerService } from '../../../services/player.service';
import { Player } from '../../../interfaces/player.interface';
import { formSteps } from './create.constants';
import { MatchService } from '../../../services/match.service';
import { CreateTeamRequest, TeamPlayer } from '../../../interfaces/team.interface';
import { TeamService } from '../../../services/team.service';
import { CreateMatch } from '../../../interfaces/match.interface';
import { LocationService } from 'src/app/services/location.service';
import { toFindDuplicatesStringsArr } from 'src/app/helpers/validations';
import { 
  threeTeam,
  fourTeam, 
  fiveTeam, 
  sixTeam, 
  sevenTeam, 
  eightTeam, 
  nineTeam, 
  tenTeam, 
  elevenTeam,
  playerPositionSelect
} from '../../../constants/player-positions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, AfterViewChecked, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize({target}: any) {
    this.checkPageWith(target.innerWidth);
  }

  datalistPlayers: Player[] = [];
  positions = threeTeam;
  readonly formSteps = formSteps;
  readonly playerPositionSelect = playerPositionSelect;
  
  currentStep: number = 0;
  loading: boolean = true;
  playersModal: boolean = false;
  showInvalidFormAlert: boolean = false;
  formAlertMessage: string = '';
  modalSize: 'small' | 'medium' | 'big' = 'small';
  
  form: FormGroup = this.fb.group({
    home_formation: ['t', Validators.required],
    home_name: ['', Validators.required],
    home_color: ['yellowgreen', Validators.required],
    away_formation: ['t', Validators.required],
    away_name: ['', Validators.required],
    away_color: ['yellowgreen', Validators.required],
    home_players: this.fb.array([]),
    away_players: this.fb.array([]),
    date: ['', Validators.required],
    location: ['', Validators.required],
    players_number: [3, Validators.required]
  });

  searchPlayer: FormControl = this.fb.control('');
  currentSearchControl?: any;
  unsubscribe$: Subject<any> = new Subject();

  get homePlayersControl() {
    return this.form.get('home_players') as FormArray;
  }
  
  get awayPlayersControl() {
    return this.form.get('away_players') as FormArray;
  }

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
    private teamService: TeamService,
    private locationService: LocationService) { }

  ngOnInit(): void {
    this.checkPageWith(window.innerWidth);
    this.loadTime();
    this.setPlayersControls(3);

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

      this.form.get('players_number')?.valueChanges
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((value: any) => {
          this.setPlayersControls(value);
        })

      this.locationService.goBackMatch
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          if(this.currentStep > 0) {
            this.closeFormAlert();
            this.currentStep -= 1;
          }else {
            this.router.navigateByUrl('cotejo/match');
          }
      });
  }

  ngAfterViewChecked(): void {
    if(this.currentStep == 0 || this.currentStep == 1){
      const {home_color, away_color} = this.form.value;
      this.resetShieldColor(this.currentStep == 0 ? home_color : away_color);
    }
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

    switch(this.currentStep) {
      case 0:
      case 1:
        this.validateTeamName(this.currentStep == 0 ? true : false);
      break;
      case 2:
        const valid = this.validTeamPlayers();
        if(valid) {
          this.closeFormAlert();
          this.currentStep += 1;
        }else{
          this.showInvalidFormAlert = true;
          this.formAlertMessage = 'All players are required and can´t be repeated';
        }
        break;
      case 3:
        if(this.validateCreateMatch()) {
          this.closeFormAlert();
          this.createMatch();
        }else {
          this.showInvalidFormAlert = true;
          this.formAlertMessage = 'The Date and Location are required';
        }
        break;
      case 4:
        this.router.navigateByUrl('cotejo/match');
        break;
      default:
        this.currentStep += 1;
      break;
    }
  }

  validateTeamName(home: boolean): void {
    if(home && this.form.get('home_name')?.errors || !home && this.form.get('away_name')?.errors){
      this.showInvalidFormAlert = true;
      this.formAlertMessage = 'The field Name is required';
    }else if(this.form.get('home_name')?.value === this.form.get('away_name')?.value){
      this.showInvalidFormAlert = true;
      this.formAlertMessage = 'The Teams cant´t have the same Name';
    }else{
      this.closeFormAlert();
      this.currentStep += 1;
      this.resetShieldColor('yellowgreen');
    }
  }

  validTeamPlayers(): boolean {
    let valid: boolean = true;
    let idPlayers: string[] = [];
    this.positions.forEach((pos: string, index: number) => {
      if(this.form.get(`home_players.${index}.id`)?.errors
      || this.form.get(`away_players.${index}.id`)?.errors){
        valid = false;
      }
      idPlayers.push(this.form.get(`home_players.${index}.id`)?.value);
      idPlayers.push(this.form.get(`away_players.${index}.id`)?.value);
    });

    valid = !valid || toFindDuplicatesStringsArr(idPlayers).filter(el => el !== '').length > 0 ? false : true;

    return valid;
  }

  validateCreateMatch(): boolean {
    return (this.form.get('date')?.errors || this.form.get('location')?.errors) ? false : true;
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

  closeFormAlert(): void {
    this.showInvalidFormAlert = false;
  }

  checkPageWith(width: number): void {
    this.modalSize = width <= 768
    ? 'big' : 'small';
  }

  private resetShieldColor(color: string): void {
    this.shieldPath.nativeElement.setAttribute('fill', color ? color : 'yellowgreen');
  }

  private setPlayersControls(players: number): void {
    this.homePlayersControl.clear();
    this.awayPlayersControl.clear();
    for (let index = 0; index < players; index++) {
      this.homePlayersControl.push(
        this.fb.group({
          id: ['', Validators.required],
          name: [{value: '', disabled: true}],
        }),
      );
      this.awayPlayersControl.push(
        this.fb.group({
          id: ['', Validators.required],
          name: [{value: '', disabled: true}],
        }),
      );
    }
    this.setPlayersPositionsLabels(+players);
  }

  private setPlayersPositionsLabels(players: number): void {
    switch(players) {
      case 3:
        this.positions = threeTeam;
      break;
      case 4:
        this.positions = fourTeam;
      break;
      case 5:
        this.positions = fiveTeam;
      break;
      case 6:
        this.positions = sixTeam;
      break;
      case 7:
        this.positions = sevenTeam;
      break;
      case 8:
        this.positions = eightTeam;
      break;
      case 9:
        this.positions = nineTeam;
      break;
      case 10:
        this.positions = tenTeam;
      break;
      case 11:
        this.positions = elevenTeam;
      break;
      default:
      break;
    }
  }
}
