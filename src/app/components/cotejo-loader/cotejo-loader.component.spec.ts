import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotejoLoaderComponent } from './cotejo-loader.component';

describe('CotejoLoaderComponent', () => {
  let component: CotejoLoaderComponent;
  let fixture: ComponentFixture<CotejoLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotejoLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotejoLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
