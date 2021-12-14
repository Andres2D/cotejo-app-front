import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchDetails } from 'src/app/interfaces/match.interface';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  matchs!: MatchDetails[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.matchs = this.route.snapshot.data.match;
  }

  goToMatch({match = '',home = '', away = ''}) {
    this.router.navigateByUrl(`cotejo/match/details/${match}/${home}/${away}`);
  }
}
