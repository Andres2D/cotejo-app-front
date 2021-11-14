import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Profile } from 'src/app/interfaces/profile.interface';
import { ratingForm, infoForm, avatarCustomize } from './player.constants';
import { calculateArrAVG } from '../../helpers/calculations';
import { PlayerForm } from 'src/app/interfaces/rating-form.interface';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit, OnDestroy {

  readonly ratingForm = ratingForm;
  readonly infoForm = infoForm;
  readonly avatarCustomize = avatarCustomize;

  profile: Profile | null = null;
  rates: {[key: string]: number } = {};
  showModal: boolean = true;
  showAvatarModal: boolean = true;
  overall: number = 0;
  openedSection: string = '';

  rating: FormGroup = this.fb.group({
    overall: [{value: 50, disabled: true}, Validators.required],
    defense: [50, Validators.required],
    passing: [50, Validators.required],
    physical: [50, Validators.required],
    dribbling: [50, Validators.required],
    peace: [50, Validators.required],
    shooting: [50, Validators.required],
  });
  
  player: FormGroup = this.fb.group({
    name: ['', Validators.required],
    nickname: [''],
    number: [1],
    image: ['']
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
    this.initPlayerForm();
     
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

  initPlayerForm(): void {
    this.player.controls['name'].setValue(this.profile?.player.name);
    this.player.controls['nickname'].setValue(this.profile?.player.nickname);
    this.player.controls['number'].setValue(this.profile?.player.number);
    this.player.controls['image'].setValue(this.profile?.player.image);
  }

  saveProfile(): void {
    if(this.rating.touched) {
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
    
    if(this.player.touched) {
      if(this.player.valid){

        const request = {
          name: this.player.value.name,
          email: this.profile?.player.email,
          nickname: this.player.value.nickname,
          number: this.player.value.number,
          status: this.profile?.player.status,
          image: this.profile?.player.image,
        }

        this.playerService.updatePlayer(request).pipe(
          takeUntil(this.$ngUnsubscribe)
        ).subscribe({
          next: (res) => {
            if(res.ok) {
              const {_id, ...newData} = res.playerDB;
              this.profile!.player.name = newData.name;
            }else{
              // TODO: handle
            }
          },
          error: (err) => {
            console.log(err);
            this.router.navigateByUrl('login');
          }
        });
      }
    }
    this.modal();
  }

  calculateOverall(): void {
    const values = Object.values(this.rating.value);
    const overall = calculateArrAVG(values);
    this.rating?.controls.overall.setValue(overall);
  }

  openSection(option: string) {
    this.openedSection = option === this.openedSection ?  '' : option;
  }

  modalAvatar(): void {
    console.log('Modal');
  }

  getImage(option: string): string {
    return this.openedSection === option 
      ? '../../../assets/icons/chevron-up-arrow.svg' 
      : '../../../assets/icons/chevron-down-arrow.svg';
  }

  updateAvatar(): void {
    console.log();
  }
}
