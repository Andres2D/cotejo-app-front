import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatchDB, MatchDetails } from 'src/app/interfaces/match.interface';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit, OnDestroy {

  matchs!: MatchDetails[];
  matchForm!: FormGroup;
  modal: boolean = false;
  selectedMatch!:  MatchDetails;
  unsubscribe: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder,
    private matchService: MatchService) { }

  ngOnInit(): void {
    this.matchs = this.route.snapshot.data.match;
    this.matchForm = this.fb.group({
      date: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  goToMatch(id: string) {
    this.router.navigateByUrl(`cotejo/match/details/${id}`);
  }

  return(): void {
    this.router.navigateByUrl('cotejo');
  }

  showModal(match: MatchDetails): void {
    this.selectedMatch = match;
    this.matchForm.controls['date'].setValue(match.date);
    this.matchForm.controls['location'].setValue(match.location);
    this.modal = true;
  }

  closeModal(): void {
    this.modal = false;
  }

  saveChanges(): void {
    if(!this.matchForm.invalid){ 

      const {_id, home_team, away_team, } = this.selectedMatch;
      const formDate = this.matchForm.get('date')?.value;
      const formLocation = this.matchForm.get('location')?.value;

      const matchUpdate: MatchDB = {
        _id,
        date: formDate,
        location: formLocation,
        home_team: home_team._id,
        away_team: away_team._id
      };

      const newMatchs = this.matchs
                        .map(m => m._id === _id 
                          ? {...m, date: formDate, location: formLocation} :
                         m);
      
      this.matchs = newMatchs;
      this.modal = false;
      this.matchService.updateMatch(_id, matchUpdate)
        .subscribe(() => {
          //TODO: show good save
      });

    }else{
      //TODO: Catch error
    }
  }

  create(): void {
    this.router.navigateByUrl('cotejo/match/create');
  }

  deleteMatch(idMatch: string): void {
    console.log(idMatch);
  }
}
