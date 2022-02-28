import { Component, OnInit, OnDestroy } from '@angular/core';
import { quotes } from '../../constants/player-quotes';
import { PlayerQuote } from '../../interfaces/player-quote.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  interval: any;
  readonly quotes = quotes;
  quote: PlayerQuote = quotes[0];
  constructor() { }

  get quotesLenght() {
    return this.quotes.length - 1;
  }

  ngOnInit(): void {
   this.interval = setInterval(() => {
      this.quote = this.quotes[Math.floor(Math.random() * this.quotesLenght)];
    }, 30000);
  }

  ngOnDestroy(): void {
      clearInterval(this.interval);
  }
}
