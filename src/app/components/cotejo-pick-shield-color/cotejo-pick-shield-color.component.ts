import { 
  Component, 
  EventEmitter, 
  Input, 
  Output, 
  ViewChild, 
  ElementRef, 
  ChangeDetectionStrategy
} from '@angular/core';
import { shieldColors } from 'src/app/constants/colors.constants';

@Component({
  selector: 'app-cotejo-pick-shield-color',
  templateUrl: './cotejo-pick-shield-color.component.html',
  styleUrls: ['./cotejo-pick-shield-color.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CotejoPickShieldColorComponent {

  @Input() colors: string[] = shieldColors;
  @Output() updateColor: EventEmitter<string> = new EventEmitter();
  @ViewChild('section') colorSection!: ElementRef;

  updateShield(color: string): void {
    this.updateColor.emit(color);
  }

  scrollColors(direction: 'up' | 'down'): void {
    direction === 'up' ? this.colorSection.nativeElement.scroll({
      top: this.colorSection.nativeElement.scrollTop + 100,
      behavior: 'smooth'
    }) : this.colorSection.nativeElement.scroll({
      top: this.colorSection.nativeElement.scrollTop - 100,
      behavior: 'smooth'
    });
  }
}
