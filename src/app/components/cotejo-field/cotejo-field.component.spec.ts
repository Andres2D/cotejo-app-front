import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotejoFieldComponent } from './cotejo-field.component';

describe('CotejoFieldComponent', () => {
  let component: CotejoFieldComponent;
  let fixture: ComponentFixture<CotejoFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotejoFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotejoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
