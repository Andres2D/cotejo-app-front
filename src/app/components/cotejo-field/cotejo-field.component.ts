import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatchPlayer, Player } from 'src/app/interfaces/player.interface';
import { Team } from 'src/app/interfaces/team.interface';
@Component({
  selector: 'app-cotejo-field',
  templateUrl: './cotejo-field.component.html',
  styleUrls: ['./cotejo-field.component.scss']
})
export class CotejoFieldComponent implements OnInit {

  @Input() team: MatchPlayer[] = [];
  @Input() teamData: Team = {
    name: 'New team',
    color: 'red',
    formation: 's',
    _id: '1'
  };
  @Output() save = new EventEmitter();
  @Output() setTeam = new EventEmitter();
  
  focusPlayer!: MatchPlayer | undefined;
  focusPlayerIndex: number = 0;
  isChanging: boolean = false;

  formation: FormControl = new FormControl('s');

  ngOnInit(): void {
    this.formation.setValue(this.teamData.formation);
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
        this.team[this.focusPlayerIndex] = player;
        this.team[index] = this.focusPlayer;
        // TODO: do the request
        this.resetFocus();
      }else {
        this.isChanging = true;
      }
    }else{
      this.resetFocus();
    }
  }

  private resetFocus(): void {
    this.isChanging = false;
    this.focusPlayer = undefined;
    this.focusPlayerIndex = 0;
  }
}
