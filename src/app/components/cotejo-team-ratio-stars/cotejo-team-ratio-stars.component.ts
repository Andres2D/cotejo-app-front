import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-cotejo-team-ratio-stars',
  templateUrl: './cotejo-team-ratio-stars.component.html',
  styleUrls: ['./cotejo-team-ratio-stars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CotejoTeamRatioStarsComponent {
  
  @Input() teamOverall: number = 0;

}
