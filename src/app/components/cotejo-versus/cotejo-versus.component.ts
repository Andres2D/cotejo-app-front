import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TeamBasic } from 'src/app/interfaces/match.interface';

@Component({
  selector: 'app-cotejo-versus',
  templateUrl: './cotejo-versus.component.html',
  styleUrls: ['./cotejo-versus.component.scss'],
})
export class CotejoVersusComponent implements AfterViewInit {

  @Input() home: TeamBasic = {
    _id: '1',
    color: '#DE0037',
    formation: '4-4-2',
    name: 'Home team'
  };
  
  @Input() away: TeamBasic = {
    _id: '2',
    color: '#005CA7',
    formation: '4-4-2',
    name: 'Away team'
  };

  @Input() date: string = '0000';
  @Input() location: string = 'Stadium';
  @Input() id: string = '1';

  @Output() clickMatch = new EventEmitter<string>();

  @ViewChild('homePath') homePath!: ElementRef;
  @ViewChild('awayPath') awayPath!: ElementRef;
  
  ngAfterViewInit() {
    this.homePath.nativeElement.setAttribute('fill', this.home.color);
    this.awayPath.nativeElement.setAttribute('fill', this.away.color);
  }

  emitAction(): void {
    this.clickMatch.emit(this.id);
  }
}
