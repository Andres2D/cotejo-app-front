import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Profile } from 'src/app/interfaces/profile.interface';
import { ratingForm, infoForm, avatarCustomize, paletteColors } from './player.constants';
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
  readonly paletteColors = paletteColors;

  profile: Profile | null = null;
  rates: {[key: string]: number } = {};
  showModal: boolean = false;
  showAvatarModal: boolean = false;
  overall: number = 0;
  openedSection: string = '';
  originalAvatar?: string = '';
  showModalPalette: boolean = false;
  coverColor?: string = '#6ABD67';
  showUpdatePreview = false;

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
    this.originalAvatar = profile?.player?.image;
    this.coverColor = this.profile?.player.status;
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
          image: this.player.value.image,
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
    this.showUpdatePreview = false;
    this.openedSection = option === this.openedSection ?  '' : option;
    setTimeout(() => {
      this.showUpdatePreview = true;
    }, 1000);
  }

  modalAvatar(): void {
    this.showAvatarModal = this.showAvatarModal ? false : true;
  }

  getImage(option: string): string {
    return this.openedSection === option 
      ? '../../../assets/icons/chevron-up-arrow.svg' 
      : '../../../assets/icons/chevron-down-arrow.svg';
  }

  updateAvatar(): void {
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
            this.originalAvatar = this.profile?.player.image;
            this.showAvatarModal = false;
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

  updatePreview(query: string, index: number): void {
    let newQuery = this.updateQuery(query,index);
    this.profile!.player!.image = newQuery;
  }

  cancel(closeModal: boolean): void {
    this.profile!.player!.image = this.originalAvatar;
    closeModal ? this.showAvatarModal = false : null;
  }

  return() {
    this.router.navigateByUrl('cotejo')
  }

  updateQuery(query: string, index: number): string {
    let queryArr: string[] = [];
    const baseUrl = 'https://avataaars.io/?avatarStyle=Transparent';
    const trimUrl = this.profile?.player?.image?.substring(46);
    queryArr = trimUrl?.split('&') || [];

    if(queryArr.length === 10)
    switch(index) {
      case 0:
        queryArr[index] = `topType=${query}`;
      break;
      case 1:
        queryArr[index] = `accessoriesType=${query}`;
      break;
      case 2:
        queryArr[index] = `hairColor=${query}`;
      break;
      case 3:
        queryArr[index] = `facialHairType=${query}`;
      break;
      case 4:
        queryArr[index] = `clotheType=${query}`;
      break;
      case 5:
        queryArr[index] = `clotheColor=${query}`;
      break;
      case 6:
        queryArr[index] = `eyeType=${query}`;
      break;
      case 7:
        queryArr[index] = `eyebrowType=${query}`;
      break;
      case 8:
        queryArr[index] = `mouthType=${query}`;
      break;
      case 9:
        queryArr[index] = `skinColor=${query}`;
      break;
      default: 
      break;
    }
    
    return `${baseUrl}&${queryArr.join('&')}`;
  }

  openClosePaletteColor() {
    if(this.showModalPalette === true){
      this.showModalPalette = false;
    } 
    else {
      this.showModalPalette = true;
    }
  }

  updateBackgroundColor(color: string) {
    this.openClosePaletteColor();
    this.coverColor = color;
    const statusColor = {
      name: this.player.get('name')?.value,
      email: this.profile?.player.email,
      nickname: this.player.get('nickname')?.value,
      number: this.player.get('number')?.value,
      status: color,
      image: this.player.get('image')?.value
    }
    this.playerService.updatePlayer(statusColor)
    .pipe(takeUntil(this.$ngUnsubscribe))
    .subscribe(() => {
      console.log('Updated on database');
    })
  }

}
