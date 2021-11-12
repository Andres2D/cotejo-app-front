import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile.interface';
import { ratingForm, infoForm } from './player.constants';
import { calculateArrAVG } from '../../helpers/calculations';
import { PlayerForm } from 'src/app/interfaces/rating-form.interface';
import { PlayerService } from 'src/app/services/player.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit, OnDestroy {

  readonly ratingForm = ratingForm;
  readonly infoForm = infoForm;
  profile: Profile | null = null;
  rates: {[key: string]: number } = {};
  showModal: boolean = true;
  overall: number = 0;
  rating: FormGroup = this.fb.group({
    overall: [{value: 50, disabled: true}, Validators.required],
    defense: [50, Validators.required],
    passing: [50, Validators.required],
    physical: [50, Validators.required],
    dribbling: [50, Validators.required],
    peace: [50, Validators.required],
    shooting: [50, Validators.required],
  });

  private $ngUnsubscribe: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute, 
              private fb: FormBuilder, 
              private router: Router, 
              private playerService: PlayerService) { }

  ngOnInit(): void {
    const {
      rates,
      overall,
      ...profile
    } = this.route.snapshot.data.player;
    this.profile = profile;
    this.rates = rates;
    this.overall = overall;
    this.initRatingForm(); 
  }

  ngOnDestroy(): void {
    this.$ngUnsubscribe.next();
    this.$ngUnsubscribe.complete();
  }

  modal(): void {
    this.showModal = this.showModal ? false : true;
  }

  initRatingForm(): void {
    this.rating.controls['overall'].setValue(this.overall);
    this.ratingForm.forEach((rate: PlayerForm) => {
      this.rating.controls[rate.control].setValue(this.rates[rate.control]);
    })
  }

  updateRating(): void {
    if(this.rating.valid){
      this.playerService.updateRating(this.rating.getRawValue()).pipe(
        takeUntil(this.$ngUnsubscribe)
      ).subscribe({
        next: (res) => {
          if(res.ok) {
            const {overall, _id, player, ...newRates} = res.ratingDB;
            Object.entries(newRates).forEach((rate) => {
              this.rates[rate[0]] = rate[1];
            });
            this.overall = overall;
            this.modal();
          }else{
            // TODO: handle
          }
        },
        error: (err) => {
          this.router.navigateByUrl('login');
        }
      });
    }
  }

  calculateOverall(): void {
    const values = Object.values(this.rating.value);
    const overall = calculateArrAVG(values);
    this.rating?.controls.overall.setValue(overall);
  }
}
