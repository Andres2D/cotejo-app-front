import { 
  Component, 
  ViewChild, 
  ElementRef 
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.scss'],
})
export class MatchsComponent {

  @ViewChild('match') match!: ElementRef<any>;

  constructor(private router: Router){}

  fixScroll() {
    this.match?.nativeElement.scrollTo(0,0);
  }

  return():void {
    this.router.navigateByUrl('cotejo');
  }
}
