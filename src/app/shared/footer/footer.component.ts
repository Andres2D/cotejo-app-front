import { 
  Component, 
  OnInit, 
  OnDestroy, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef 
} from '@angular/core';
import { quotes } from '../../constants/player-quotes';
import { PlayerQuote } from '../../interfaces/player-quote.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit, OnDestroy {

  interval: any;
  readonly quotes = quotes;
  readonly environment = environment;
  quote: PlayerQuote = this.randomQuote;

  constructor(private cdr: ChangeDetectorRef) { }

  get quotesLenght() {
    return this.quotes.length - 1;
  }

  get randomQuote() {
    return this.quotes[Math.floor(Math.random() * this.quotesLenght)];
  }

  ngOnInit(): void {
   this.interval = setInterval(() => {
      this.quote = this.randomQuote;
      this.cdr.detectChanges();
    }, 30000);
  }

  ngOnDestroy(): void {
      clearInterval(this.interval);
  }
}
