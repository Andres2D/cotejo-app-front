import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.scss']
})
export class MatchsComponent {

  constructor(private router: Router){}

  return():void {
    this.router.navigateByUrl('cotejo');
  }

}
