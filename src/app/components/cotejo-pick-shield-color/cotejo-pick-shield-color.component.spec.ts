import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotejoPickShieldColorComponent } from './cotejo-pick-shield-color.component';

describe('CotejoPickShieldColorComponent', () => {
  let component: CotejoPickShieldColorComponent;
  let fixture: ComponentFixture<CotejoPickShieldColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotejoPickShieldColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotejoPickShieldColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
