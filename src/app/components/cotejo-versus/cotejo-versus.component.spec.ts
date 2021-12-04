import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotejoVersusComponent } from './cotejo-versus.component';

describe('CotejoVersusComponent', () => {
  let component: CotejoVersusComponent;
  let fixture: ComponentFixture<CotejoVersusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotejoVersusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotejoVersusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
