import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Team } from 'src/app/interfaces/team.interface';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  data: any;
  unsubscribe$: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private teamService: TeamService) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.details;
    console.log(this.data);
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
        });
    }
  }
}
