import { Component } from '@angular/core';
import { menuItems } from './menu.constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  readonly menuItems = menuItems;

  goTo(route: string): void {
    console.log(route);
  }

}
