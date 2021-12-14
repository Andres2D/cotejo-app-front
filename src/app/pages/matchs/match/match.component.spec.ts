import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentsModule } from '../../components/components.module';

import { MatchComponent } from './match.component';

const fakeData = 
  [
    {
      _id: '617ef99494c58d05cce6f764',
      date: '2021-11-05',
      location: 'Anfield',
      home_team: {
          _id: '617ecd6ed6983e04b9eff292',
          name: 'Team A',
          formation: '1-2-1',
          color: 'red'
        },
      away_team: {
        _id: '617ecd9d0ebe612fad65b502',
        name: 'Team B',
        formation: '2-2',
        color: 'blue'
      }
    }
  ];

describe('MatchComponent', () => {
  let component: MatchComponent;
  let fixture: ComponentFixture<MatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchComponent ],
      imports: [ ComponentsModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the match data', () => {
    component.matchs = fakeData;
    fixture.detectChanges();
    const matchPreview = fixture.nativeElement.querySelectorAll('.match');
    expect(matchPreview.length).toBe(fakeData.length);
  });

  it('should call go to match', () => {
    const spy = jest.spyOn(component, 'goToMatch');
    component.matchs = fakeData;
    fixture.detectChanges();
    const match = fixture.debugElement.query(By.css('.match'));
    match.triggerEventHandler('clickMatch', fakeData[0]._id);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(fakeData[0]._id);
  });
});
