import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotejoPlayerPreviewComponent } from './cotejo-player-preview.component';

describe('CotejoPlayerPreviewComponent', () => {
  let component: CotejoPlayerPreviewComponent;
  let fixture: ComponentFixture<CotejoPlayerPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotejoPlayerPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotejoPlayerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
