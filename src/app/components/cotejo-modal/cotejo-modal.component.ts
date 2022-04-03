import { 
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  Input, 
  Output 
} from '@angular/core';

@Component({
  selector: 'app-cotejo-modal',
  templateUrl: './cotejo-modal.component.html',
  styleUrls: ['./cotejo-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CotejoModalComponent {

  @Input() close: boolean = true;
  @Input() size: 'small' | 'medium' | 'big' = 'big';
  @Output() actionClose = new EventEmitter();

  emitClose(): void {
    this.actionClose.emit();
  }
}
