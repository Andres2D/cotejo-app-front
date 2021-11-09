import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {


  profile: Profile | null = null;
  rates?:  {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const {
      rates,
      ...player
    } = this.route.snapshot.data.player;

    this.profile = player;
    this.rates = rates; 
  }

}
