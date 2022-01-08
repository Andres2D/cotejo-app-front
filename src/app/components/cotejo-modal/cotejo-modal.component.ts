import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cotejo-modal',
  templateUrl: './cotejo-modal.component.html',
  styleUrls: ['./cotejo-modal.component.scss']
})
export class CotejoModalComponent {

  @Input() close: boolean = true;
  @Input() size: string = 'big';
  @Output() actionClose = new EventEmitter();

  emitClose(): void {
    this.actionClose.emit('');
  }
}
