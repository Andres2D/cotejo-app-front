import { 
  ChangeDetectionStrategy,
  Component, 
  EventEmitter, 
  Input, 
  Output 
} from '@angular/core';

@Component({
  selector: 'app-cotejo-button',
  templateUrl: './cotejo-button.component.html',
  styleUrls: ['./cotejo-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CotejoButtonComponent  {

  @Input() label: string = 'default';
  @Input() type: 'default' | 'danger' | 'save' | 'new' = 'default';
  @Output() goTo = new EventEmitter();

  emitAction(): void {
    this.goTo.emit('');
  }
}
