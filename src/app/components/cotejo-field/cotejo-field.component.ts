import { Component, Input, OnInit } from '@angular/core';
import { MatchPlayer } from 'src/app/interfaces/player.interface';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-cotejo-field',
  templateUrl: './cotejo-field.component.html',
  styleUrls: ['./cotejo-field.component.scss']
})
export class CotejoFieldComponent implements OnInit {

  @Input() team: MatchPlayer[] = [];
  @Input() teamName: string = 'Team';

  constructor() { }

  ngOnInit(): void {
  }

}
