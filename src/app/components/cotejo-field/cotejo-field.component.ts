import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatchPlayer } from 'src/app/interfaces/player.interface';

@Component({
  selector: 'app-cotejo-field',
  templateUrl: './cotejo-field.component.html',
  styleUrls: ['./cotejo-field.component.scss']
})
export class CotejoFieldComponent {

  @Input() team: MatchPlayer[] = [];
  @Input() teamName: string = 'Team';
  formation: FormControl = new FormControl('s');

}
