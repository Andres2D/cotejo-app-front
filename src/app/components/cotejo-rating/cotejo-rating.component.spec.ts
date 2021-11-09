import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotejoRatingComponent } from './cotejo-rating.component';

describe('CotejoRatingComponent', () => {
  let component: CotejoRatingComponent;
  let fixture: ComponentFixture<CotejoRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotejoRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotejoRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
