import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotejoModalComponent } from './cotejo-modal.component';

describe('CotejoModalComponent', () => {
  let component: CotejoModalComponent;
  let fixture: ComponentFixture<CotejoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotejoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotejoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
