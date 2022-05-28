import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Team } from 'src/app/interfaces/team.interface';
import { TeamService } from 'src/app/services/team.service';
import { shieldColors } from 'src/app/constants/colors.constants';
import { LocationService } from 'src/app/services/location.service';
import { SwitchService } from '../../../services/switch.service';
import { MatchPlayer, UpdatePlayerTeamRequest } from '../../../interfaces/player.interface';
import { PlayerService } from '../../../services/player.service';
import { calculateArrAVG } from '../../../helpers/calculations';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  data: any;
  showModal: boolean = false;
  teamForm: FormGroup = this.fb.group({
    _id: ['', Validators.required],
    formation: ['', Validators.required],
    name: ['', Validators.required],
    color: ['', Validators.required]
  });
  unsubscribe$: Subject<any> = new Subject();
  lastPlayers?: MatchPlayer[] = [];
  homeOverall: number = 0;
  awayOverall: number = 0;
  showReplaceModal = false;

  shieldColors = shieldColors;

  @ViewChild('shieldPath', {static: false}) shieldPath!: ElementRef;

  get lastPlayersLength(): number {
    return this.lastPlayers!.length;
  }

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private teamService: TeamService,
              private playerService: PlayerService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private locationService: LocationService,
              private switchService: SwitchService)  { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.details;
    this.setTeamOverall();
    this.teamForm.controls['color'].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.updateShielFillColor(value);
      });

    this.locationService.goBackMatch
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigateByUrl('cotejo/match');
      });

    this.switchService.playerSelected$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((player: MatchPlayer | null) => {

        if(player) {
          this.lastPlayers?.push(player);
        }else {
          this.lastPlayers = [];
        }

        if(this.lastPlayers?.length === 2){
          this.changlePlayerRealTime();

          const updatePlayersRequest: UpdatePlayerTeamRequest = {
            player1: this.lastPlayers[this.lastPlayersLength - 1].player._id,
            player2: this.lastPlayers[this.lastPlayersLength - 2].player._id,
            player1_team: this.lastPlayers[this.lastPlayersLength - 1].team,
            player2_team: this.lastPlayers[this.lastPlayersLength - 2].team,
          }
          
          this.playerService.updatePlayerTeam(updatePlayersRequest).subscribe(() => console.log('Players updated on server'));

          this.lastPlayers = [];
          this.switchService.playerChanges$.next();
        }

      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  return():void {
    this.router.navigateByUrl('cotejo/match');
  }

  updateTeam(team: Team): void {
    if(team) {
      this.teamService.putTeam(team, team._id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.ngOnInit();
        });
    }
  }

  openModal(team: Team): void {
    if(team) {
      this.teamForm.controls['_id'].setValue(team?._id);
      this.teamForm.controls['formation'].setValue(team?.formation);
      this.teamForm.controls['name'].setValue(team?.name);
      this.teamForm.controls['color'].setValue(team?.color);
      this.showModal = true;
      this.cdr.detectChanges();
      this.updateShielFillColor(team?.color);
    }else{
      console.log('Unhandled error');
    }
  }

  replacePlayerInit(id: string): void {
    this.showReplaceModal = true;
  }

  updateShielFillColor(color: string): void {
    if(this.shieldPath) {
      this.shieldPath.nativeElement.setAttribute('fill', color);
    }
  }

  saveChanges(): void {
    // TODO: make a better align update
    if(this.teamForm.valid) {
      this.updateTeam(this.teamForm.value);
      if(this.data.match.home_team?._id === this.teamForm.get('_id')?.value) {
        this.data.match.home_team.name = this.teamForm.get('name')?.value;
        this.data.match.home_team.color = this.teamForm.get('color')?.value;
      }else {
        this.data.match.away_team.name = this.teamForm.get('name')?.value;
        this.data.match.away_team.color = this.teamForm.get('color')?.value;
      }
      this.cdr.detectChanges();
      this.closeModal();
    }else{
      // TODO: Show error form message
    }
  }

  updateShieldColor(color: string): void {
    if(!color) return;
    this.teamForm.get('color')?.setValue(color);
  }

  closeModal(): void {
    this.teamForm.reset();
    this.showModal = false;
  } 

  closeReplaceModal(): void {
    this.showReplaceModal = false;
  }

  /**
  * Change the players of teams on real time, but not send the request to the server.
  */
  private changlePlayerRealTime(): void {
    let indexHome = 0;
    let indexAway = 0;
    let newHomePLayer: MatchPlayer;
    let newAwayPLayer: MatchPlayer;

    if(this.data.home.indexOf(this.lastPlayers![this.lastPlayersLength - 1 ]) !== - 1) {
      indexHome = this.data.home.indexOf(this.lastPlayers![this.lastPlayersLength - 1 ]);
      indexAway = this.data.away.indexOf(this.lastPlayers![this.lastPlayersLength - 2 ]);
    }else {
      indexHome = this.data.home.indexOf(this.lastPlayers![this.lastPlayersLength - 2 ]);
      indexAway = this.data.away.indexOf(this.lastPlayers![this.lastPlayersLength - 1 ]);
    }

    newHomePLayer = {...this.data.away[indexAway]};
    newAwayPLayer = {...this.data.home[indexHome]};

    this.data.home[indexHome] = { ...newHomePLayer };
    this.data.away[indexAway] = { ...newAwayPLayer };

    this.data.home[indexHome].position = newAwayPLayer.position;
    this.data.home[indexHome].team = newAwayPLayer.team;
    
    this.data.away[indexAway].position = newHomePLayer.position;
    this.data.away[indexAway].team = newHomePLayer.team;
    this.setTeamOverall();
  }

  private setTeamOverall(): void {
    let homeOverallArray: number[] = [];
    let awayOverallArray: number[] = [];

    this.data.home.map(({overall}: any) => homeOverallArray.push(overall));
    this.homeOverall = +calculateArrAVG(homeOverallArray);

    this.data.away.map(({overall}: any) => awayOverallArray.push(overall));
    this.awayOverall = +calculateArrAVG(awayOverallArray);
  }
}
