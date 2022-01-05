import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatchPlayer } from 'src/app/interfaces/player.interface';
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
}
