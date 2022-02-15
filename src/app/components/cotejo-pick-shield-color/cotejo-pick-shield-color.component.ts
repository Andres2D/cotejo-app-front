import { Component, EventEmitter, Input, Output } from '@angular/core';
import { shieldColors } from 'src/app/constants/colors.constants';

@Component({
  selector: 'app-cotejo-pick-shield-color',
  templateUrl: './cotejo-pick-shield-color.component.html',
  styleUrls: ['./cotejo-pick-shield-color.component.scss']
})
export class CotejoPickShieldColorComponent {

  @Input() colors: string[] = shieldColors;
  @Output() updateColor: EventEmitter<string> = new EventEmitter();

  updateShield(color: string): void {
    this.updateColor.emit(color);
  }
}
