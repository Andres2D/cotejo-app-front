import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { menuItems } from './menu.constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  constructor(private router: Router, private authservice: AuthService) {}

  readonly menuItems = menuItems;

  goTo(route: string): void {
    if(route === 'login') {
      this.authservice.removeToken();
    }
    this.router.navigateByUrl(route);
  }
}
