import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Team } from 'src/app/interfaces/team.interface';
import { TeamService } from 'src/app/services/team.service';
import { shieldColors } from 'src/app/constants/colors.constants';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  data: any;
  showModal: boolean = false;
  teamForm: FormGroup = this.fb.group({
    _id: ['', Validators.required],
    formation: ['', Validators.required],
    name: ['', Validators.required],
    color: ['', Validators.required]
  });
  unsubscribe$: Subject<any> = new Subject();

  shieldColors = shieldColors;

  @ViewChild('shieldPath', {static: false}) shieldPath!: ElementRef;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private teamService: TeamService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private locationService: LocationService)  { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.details;
    this.teamForm.controls['color'].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.updateShielFillColor(value);
      });

    this.locationService.goBackMatch
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigateByUrl('cotejo/match');
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  return():void {
    this.router.navigateByUrl('cotejo/match');
  }

  updateTeam(team: Team): void {
    if(team) {
      this.teamService.putTeam(team, team._id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.ngOnInit();
        });
    }
  }

  openModal(team: Team): void {
    if(team) {
      this.teamForm.controls['_id'].setValue(team?._id);
      this.teamForm.controls['formation'].setValue(team?.formation);
      this.teamForm.controls['name'].setValue(team?.name);
      this.teamForm.controls['color'].setValue(team?.color);
      this.showModal = true;
      this.cdr.detectChanges();
      this.updateShielFillColor(team?.color);
    }else{
      console.log('Unhandled error');
    }
  }

  updateShielFillColor(color: string): void {
    if(this.shieldPath) {
      this.shieldPath.nativeElement.setAttribute('fill', color);
    }
  }

  saveChanges(): void {
    // TODO: make a better align update
    if(this.teamForm.valid) {
      this.updateTeam(this.teamForm.value);
      if(this.data.match.home_team?._id === this.teamForm.get('_id')?.value) {
        this.data.match.home_team.name = this.teamForm.get('name')?.value;
        this.data.match.home_team.color = this.teamForm.get('color')?.value;
      }else {
        this.data.match.away_team.name = this.teamForm.get('name')?.value;
        this.data.match.away_team.color = this.teamForm.get('color')?.value;
      }
      this.closeModal();
    }else{
      // TODO: Show error form message
    }
  }

  updateShieldColor(color: string): void {
    if(!color) return;
    this.teamForm.get('color')?.setValue(color);
  }

  closeModal(): void {
    this.teamForm.reset();
    this.showModal = false;
  } 
}
