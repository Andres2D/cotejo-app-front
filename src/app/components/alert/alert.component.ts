import { 
  Component, 
  EventEmitter, 
  Input, 
  Output, 
  ChangeDetectionStrategy 
} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent  {

  @Input() type: 'error' | 'warning' | 'info' = 'error';
  @Input() message: string = '';
  @Input() close: boolean = true;

  @Output() closeAction = new EventEmitter();

  emitAction() {
    this.closeAction.emit();
  }
}
