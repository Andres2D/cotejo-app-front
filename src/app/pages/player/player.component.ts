import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile.interface';
import { ratingForm } from './player.constants';
import { calculateArrAVG } from '../../helpers/calculations';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  readonly ratingForm = ratingForm;
  profile: Profile | null = null;
  rates?:  {};
  showModal: boolean = false;
  rating: FormGroup = this.fb.group({
    overall: [{value: 50, disabled: true}, Validators.required],
    defense: [50, Validators.required],
    passing: [50, Validators.required],
    physical: [50, Validators.required],
    dribbling: [50, Validators.required],
    peace: [50, Validators.required],
    shooting: [50, Validators.required],
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    const {
      rates,
      ...player
    } = this.route.snapshot.data.player;

    this.profile = player;
    this.rates = rates; 
  }

  modal(): void {
    this.showModal = this.showModal ? false : true;
  }

  updateRating(): void {
    if(this.rating.valid){
      console.log(this.rating.getRawValue()); 
    }
  }

  calculateOverall(): void {
    const values = Object.values(this.rating.value);
    const overall = calculateArrAVG(values);
    this.rating.controls.overall.setValue(overall);
  }
}
