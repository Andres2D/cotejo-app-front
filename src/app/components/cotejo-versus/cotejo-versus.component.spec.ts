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

  it('should render the init data', () => {
    const fakeInitNames = {
      home: 'Liverpool',
      away: 'Chelsea'
    };
    component.home.name = fakeInitNames.home;
    component.away.name = fakeInitNames.away;
    fixture.detectChanges();
    const home = fixture.nativeElement.querySelector('.home'); 
    const away = fixture.nativeElement.querySelector('.away'); 
    expect(home.textContent).toBe(fakeInitNames.home);
    expect(away.textContent).toBe(fakeInitNames.away);
  });

  it('should emit the correct id', () => {
    const spy = jest.spyOn(component.clickMatch, 'emit');
    component.id = '123';
    fixture.detectChanges();
    const parent = fixture.nativeElement.querySelector('.fixture');
    parent.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
