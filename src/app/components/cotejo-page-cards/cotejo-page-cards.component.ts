import { Component } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-cotejo-page-cards',
  templateUrl: './cotejo-page-cards.component.html',
  styleUrls: ['./cotejo-page-cards.component.scss']
})
export class CotejoPageCardsComponent {

  constructor(private locationService: LocationService) {}

  goBack(): void {
    this.locationService.goBackMatch.next();
  }
}
