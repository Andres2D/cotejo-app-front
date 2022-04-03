import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { icons } from './rating.constants';

@Component({
  selector: 'app-cotejo-rating',
  templateUrl: './cotejo-rating.component.html',
  styleUrls: ['./cotejo-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CotejoRatingComponent {

  readonly icons = icons;

  @Input() label: string = 'peace';
  @Input() rate: number = 50;
}
