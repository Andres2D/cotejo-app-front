import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotejoTeamRatioStarsComponent } from './cotejo-team-ratio-stars.component';

describe('CotejoTeamRatioStarsComponent', () => {
  let component: CotejoTeamRatioStarsComponent;
  let fixture: ComponentFixture<CotejoTeamRatioStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotejoTeamRatioStarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotejoTeamRatioStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
