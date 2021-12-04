import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchDetails } from 'src/app/interfaces/match.interface';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  matchs!: MatchDetails[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.matchs = this.route.snapshot.data.match;
    console.log(this.matchs); 
  }

}
