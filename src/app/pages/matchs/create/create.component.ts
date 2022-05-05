import { 
  Component, 
  ViewChild, 
  ElementRef, 
  OnInit, 
  OnDestroy, 
  HostListener 
} from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  Validators, 
  FormArray, 
  FormControl, 
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
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
// import { toFindDuplicatesStringsArr } from 'src/app/helpers/validations';
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
  styleUrls: ['./create.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class CreateComponent implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize({target}: any) {
    this.checkPageWith(target.innerWidth);
  }

  datalistPlayers: Player[] = [];
  positions = threeTeam;
  readonly formSteps = formSteps;
  readonly playerPositionSelect = playerPositionSelect;
  
  // currentStep: number = 0;
  loading: boolean = true;
  playersModal: boolean = false;
  showInvalidFormAlert: boolean = false;
  showSearchResults: boolean = true;
  loadingSearch: boolean = false;
  formAlertMessage: string = '';
  modalSize: 'small' | 'medium' | 'big' = 'small';

  // stepperArray: FormArray = this.fb.array([0,2,3,4]);
  get stepperArray(): AbstractControl | null { return this.form.get('formArray'); }
  
  form: FormGroup = this.fb.group({
    stepperArray: this.fb.array([
      this.fb.group({
        home_formation: ['t', Validators.required],
        home_name: ['', Validators.required],
        home_color: ['yellowgreen', Validators.required], 
      }),
      this.fb.group({
        away_formation: ['t', Validators.required],
        away_name: ['', Validators.required],
        away_color: ['yellowgreen', Validators.required], 
      }),
      this.fb.group({
        players_number: [3, Validators.required],
        home_players: this.fb.array([]),
        away_players: this.fb.array([]),
      }),
      this.fb.group({
        date: ['', Validators.required],
        location: ['', Validators.required],
      })
    ])
  });

  searchPlayer: FormControl = this.fb.control('');
  currentSearchControl?: any;
  unsubscribe$: Subject<any> = new Subject();

  get homePlayersControl() {
    return this.form.get('stepperArray')?.get('2')?.get('home_players') as FormArray;
  }
  
  get awayPlayersControl() {
    return this.form.get('stepperArray')?.get('2')?.get('away_players') as FormArray;
  }

  @ViewChild('homeShieldPath') homeShieldPath!: ElementRef;
  @ViewChild('awayShieldPath') awayShieldPath!: ElementRef;

  get homeFormArray() {
    return this.form.get('stepperArray')?.get('2')?.get('home_players') as FormArray;
  }

  get awayFormArray() {
    return this.form.get('stepperArray')?.get('2')?.get('away_players') as FormArray;
  }

  get homeTeamName() {
    return this.form.get('stepperArray')?.get('0')?.get('home_name')?.value;
  }
  
  get awayTeamName() {
    return this.form.get('stepperArray')?.get('1')?.get('away_name')?.value;
  }

  get homeTeamColor() {
    return this.form.get('stepperArray')?.get('0')?.get('home_color');
  }
  
  get awayTeamColor() {
    return this.form.get('stepperArray')?.get('1')?.get('away_color');
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
        this.loadingSearch = true;
        if(val?.length > 2) {
          this.searchPlayerDB(val);
        }else{
          this.loadingSearch = false;
        }
      });

      this.form.get('stepperArray')?.get('2')?.get('players_number')?.valueChanges
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((value: any) => {
          this.setPlayersControls(value);
        })

      // this.locationService.goBackMatch
      //   .pipe(takeUntil(this.unsubscribe$))
      //   .subscribe(() => {
      //     if(this.currentStep > 0) {
      //       this.closeFormAlert();
      //       this.currentStep -= 1;
      //       this.scrollToTop();
      //     }else {
      //       this.router.navigateByUrl('cotejo/match');
      //     }
      // });
  }

  // ngAfterViewChecked(): void {
  //   // if(this.currentStep == 0 || this.currentStep == 1){
  //   //   const {home_color, away_color} = this.form.value;
  //   //   this.resetShieldColor(this.currentStep == 0 ? home_color : away_color);
  //   // }
  // }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadTime(): void {
    this.loading = false;
    // setTimeout(() => {
    // }, 2000);
  }

  updateShield(color: string, index: number): void {
    if(index === 0) {
      this.homeShieldPath.nativeElement.setAttribute('fill', color);
      this.homeTeamColor?.setValue(color);
    }else if(index === 1) {
      this.awayShieldPath.nativeElement.setAttribute('fill', color);
      this.awayTeamColor?.setValue(color);
    }
  }

  // nextStep(): void {
  //   this.loading = true;
  //   this.loadTime();

  //   switch(this.currentStep) {
  //     case 0:
  //     case 1:
  //       this.validateTeamName(this.currentStep == 0 ? true : false);
  //     break;
  //     case 2:
  //       const valid = this.validTeamPlayers();
  //       if(valid) {
  //         this.closeFormAlert();
  //         this.currentStep += 1;
  //       }else{
  //         this.showInvalidFormAlert = true;
  //         this.formAlertMessage = 'All players are required and can´t be repeated';
  //       }
  //       break;
  //     case 3:
  //       if(this.validateCreateMatch()) {
  //         this.closeFormAlert();
  //         this.createMatch();
  //       }else {
  //         this.showInvalidFormAlert = true;
  //         this.formAlertMessage = 'The Date and Location are required';
  //       }
  //       break;
  //     case 4:
  //       this.router.navigateByUrl('cotejo/match');
  //       break;
  //     default:
  //       this.currentStep += 1;
  //     break;
  //   }

  //  this.scrollToTop();
  // }

  // validateTeamName(home: boolean): void {
  //   if(home && this.form.get('home_name')?.errors || !home && this.form.get('away_name')?.errors){
  //     this.showInvalidFormAlert = true;
  //     this.formAlertMessage = 'The field Name is required';
  //   }else if(this.form.get('home_name')?.value === this.form.get('away_name')?.value){
  //     this.showInvalidFormAlert = true;
  //     this.formAlertMessage = 'The Teams cant´t have the same Name';
  //   }else{
  //     this.closeFormAlert();
  //     this.currentStep += 1;
  //     this.resetShieldColor('yellowgreen');
  //   }
  // }

  // validTeamPlayers(): boolean {
  //   let valid: boolean = true;
  //   let idPlayers: string[] = [];
  //   this.positions.forEach((pos: string, index: number) => {
  //     if(this.form.get(`home_players.${index}.id`)?.errors
  //     || this.form.get(`away_players.${index}.id`)?.errors){
  //       valid = false;
  //     }
  //     idPlayers.push(this.form.get(`home_players.${index}.id`)?.value);
  //     idPlayers.push(this.form.get(`away_players.${index}.id`)?.value);
  //   });

  //   valid = !valid || toFindDuplicatesStringsArr(idPlayers).filter(el => el !== '').length > 0 ? false : true;

  //   return valid;
  // }

  // validateCreateMatch(): boolean {
  //   return (this.form.get('date')?.errors || this.form.get('location')?.errors) ? false : true;
  // }

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
    const foundPlayer = this.datalistPlayers
    .filter(pl => pl.name === this.searchPlayer.value);

    if(foundPlayer.length) {
      this.currentSearchControl.get('name')?.setValue(this.searchPlayer.value);
      this.currentSearchControl.get('id')
        ?.setValue(foundPlayer[0]._id);
    }

    this.closePlayerModal();
  }

  searchPlayerDB(query: string): void {
    if(!query) return;

    this.playerService.searchPlayer(query)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({players}) => {
        this.loadingSearch = false;
        this.datalistPlayers = [];

        players.forEach(player => {
          this.datalistPlayers.push(player);
          this.showSearchResults = true;
        });
      })
  }

  createMatch(): void {
    if(!this.form.invalid) {

      const { stepperArray } = this.form.value;
      const [ 
        {
          home_color, 
          home_formation, 
          home_name 
        },
        {
          away_color,
          away_formation,
          away_name
        },
        {},
        {
          date,
          location
        }
      ] = stepperArray;
  
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

      console.log('create match');
  
      // const createHome = this.teamService.postTeam(homeTeamReq);
      // const createAway = this.teamService.postTeam(awayTeamReq);
  
      // combineLatest([createHome, createAway])
      //   .pipe(takeUntil(this.unsubscribe$))
      //   .subscribe(teams => {
      //     const [home, away] = teams;
      //     const homeTeamId = home.team._id;
      //     const awayTeamId = away.team._id;
  
      //     const teamPlayerHomeRequest = this.getRequestData(homeTeamId, 'home');
      //     const teamPlayerAwayRequest = this.getRequestData(awayTeamId, 'away');
  
      //     const createHomeTeamPlayers = this.playerService.postTeamPlayer(teamPlayerHomeRequest);
      //     const createAwayTeamPlayers = this.playerService.postTeamPlayer(teamPlayerAwayRequest);
  
      //     combineLatest([createHomeTeamPlayers, createAwayTeamPlayers])
      //       .pipe(takeUntil(this.unsubscribe$))
      //         .subscribe();
  
      //     const createMatchRequest: CreateMatch = {
      //       date,
      //       location,
      //       home_team: homeTeamId,
      //       away_team: awayTeamId
      //     }
  
      //     this.matchService.createMatch(createMatchRequest)
      //       .pipe(takeUntil(this.unsubscribe$))
      //       .subscribe(res => {
      //         // this.currentStep = this.currentStep + 1;
      //       });
      //   });
    }
  }

  getRequestData(team: string, control: string): TeamPlayer[] {
    const teamPlayers: TeamPlayer[] = [];

    if(control === 'home') {
      this.homeFormArray.value.forEach(({id}: any, i: number) => {
        const teamPlayer: TeamPlayer = {
          isCaptain: false,
          player: id,
          position: this.positions[i].toUpperCase(),
          team
        };
        teamPlayers.push(teamPlayer);
      });
    } else if(control === 'away') {
      this.awayFormArray.value.forEach(({id}: any, i: number) => {
        const teamPlayer: TeamPlayer = {
          isCaptain: false,
          player: id,
          position: this.positions[i].toUpperCase(),
          team
        };
        teamPlayers.push(teamPlayer);
      });
    }

    return teamPlayers;
  }

  closeFormAlert(): void {
    this.showInvalidFormAlert = false;
  }

  checkPageWith(width: number): void {
    this.modalSize = width <= 768
    ? 'big' : 'small';
  }

  // private resetShieldColor(color: string): void {
  //   this.homeShieldPath.nativeElement.setAttribute('fill', color ? color : 'yellowgreen');
  // }

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

  setSearch(value: string): void {
    if(value){
      this.searchPlayer.setValue(value, { emitEvent: false });
    }
    this.showSearchResults = false;
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

  private scrollToTop(): void {
    window.scrollTo(0,0);
  }
}
