import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { menuItems } from './menu.constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private router: Router) {}

  readonly menuItems = menuItems;

  goTo(route: string): void {
    console.log(route);
    this.router.navigateByUrl(`cotejo/${route}`);
  }
}
