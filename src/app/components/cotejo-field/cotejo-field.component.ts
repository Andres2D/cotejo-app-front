import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatchPlayer } from 'src/app/interfaces/player.interface';
import { Team, TeamPlayer } from 'src/app/interfaces/team.interface';
import { TeamService } from 'src/app/services/team.service';
import { playersPositionsMap, orderRule } from '../../constants/player-positions';
import { SwitchService } from '../../services/switch.service';

@Component({
  selector: 'app-cotejo-field',
  templateUrl: './cotejo-field.component.html',
  styleUrls: ['./cotejo-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CotejoFieldComponent implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize({target}: any) {
    this.checkPageWith(target.innerWidth);
  }

  @Input() team: MatchPlayer[] = [];
  @Input() teamData: Team = {
    name: 'New team',
    color: 'red',
    formation: 's',
    _id: '1'
  };
  @Output() save = new EventEmitter();
  @Output() setTeam = new EventEmitter();
  
  readonly playersPositionsMap = playersPositionsMap;
  readonly orderRule = orderRule;
  focusPlayer!: MatchPlayer | undefined;
  focusPlayerIndex: number = 0;
  isChanging: boolean = false;
  formationSelect: boolean = true;
  

  formation: FormControl = new FormControl('s');
  unsubscribe$: Subject<any> = new Subject();

  get teamLength(): number {
    return this.team.length;
  }

  constructor(
    private teamService: TeamService,
    private cdr: ChangeDetectorRef,
    private switchService: SwitchService
  ) {}

  ngOnInit(): void {
    this.checkPageWith(window.innerWidth);
    this.orderTeamPositions();
    this.formation.setValue(this.teamData.formation);

    this.switchService.playerChanges$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.resetFocus();
        this.cdr.detectChanges();
      })

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  orderTeamPositions(): void {
    this.team.sort((a, b) => {

      if(this.orderRule[a.position] < this.orderRule[b.position]) {
        return -1;
      }

      if(this.orderRule[a.position] > this.orderRule[b.position]) {
        return 1;
      }

      return 0;
    })
  }

  putTeam(): void {
    let newTeam = {...this.teamData};
    newTeam.formation = this.formation.value;
    this.save.emit(newTeam);
  }

  emitSetTeam(): void {
    this.setTeam.emit();
  }

  selectPlayer(player: MatchPlayer, index: number): void {
    if(player !== this.focusPlayer) {

      if(!this.focusPlayer) {
        this.focusPlayer = player;
        this.focusPlayerIndex = index;
      }
      
      if(this.isChanging) {

        this.switchService.playerSelected$.next(null);

        let focusPosition = this.team[this.focusPlayerIndex].position;
        let playerPosition = player.position;

        this.team[this.focusPlayerIndex].position = playerPosition;
        this.team[index].position = focusPosition;

        this.team[this.focusPlayerIndex] = player;
        this.team[index] = this.focusPlayer;

        this.savePositions(this.focusPlayer, player, this.teamData._id)
        this.resetFocus();

      }else {
        this.isChanging = true;
        this.switchService.playerSelected$.next(player);
      }
    }else{
      this.resetFocus();
      this.switchService.playerSelected$.next(null);
    }
  }

  updateFormation(option: any): void {
    this.formation.setValue(option);
    this.cdr.detectChanges();
  }

  checkPageWith(width: number): void {
    this.formationSelect = width <= 820 
    ? true : false;
  }

  getFormation(option: string): string {
    return playersPositionsMap[this.teamLength][option]; 
  }

  private resetFocus(): void {
    this.isChanging = false;
    this.focusPlayer = undefined;
    this.focusPlayerIndex = 0;
  }

  private savePositions(
    {position: position1, isCaptain: isCaptain1, player: player1 }: MatchPlayer,
    {position: position2, isCaptain: isCaptain2, player: player2}: MatchPlayer, team: string): void {
    
      const firstPlayer: TeamPlayer = {
        position: position1,
        isCaptain: isCaptain1,
        player: player1._id,
        team
      }

      const secondPlayer: TeamPlayer = {
        position: position2,
        isCaptain: isCaptain2,
        player: player2._id,
        team
      }

      const firstChange = this.teamService.putTeamPlayer(firstPlayer);
      const secondChange = this.teamService.putTeamPlayer(secondPlayer);

      combineLatest([firstChange, secondChange])
        .pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
}
