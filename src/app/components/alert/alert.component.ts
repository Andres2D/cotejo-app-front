import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent  {

  @Input() type: 'error' | 'warning' | 'info' = 'error';
  @Input() message: string = '';
  @Input() close: boolean = true;

  @Output() closeAction = new EventEmitter();

  emitAction() {
    this.closeAction.emit('');
  }

}
