import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotejoButtonComponent } from './cotejo-button.component';

describe('CotejoButtonComponent', () => {
  let component: CotejoButtonComponent;
  let fixture: ComponentFixture<CotejoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotejoButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotejoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
