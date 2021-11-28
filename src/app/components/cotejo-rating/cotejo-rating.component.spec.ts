import { TestBed } from '@angular/core/testing';
import { CotejoRatingComponent } from './cotejo-rating.component';

describe('CotejoRatingComponent', () => {
  it('should create the component', () => {
    const component = new CotejoRatingComponent();
    expect(component).toBeTruthy();
  });

  it('should init the properties', () => {
    const component = new CotejoRatingComponent();
    expect(component.label).toBe('peace');
    expect(component.rate).toBe(50);
  });

  it('should render the properties of stats and label', () => {
    TestBed.configureTestingModule({ declarations: [CotejoRatingComponent] });
    const fixture = TestBed.createComponent(CotejoRatingComponent);
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    const stat: string = 'force';
    const rate: number = 80;
    component.rate = rate;
    component.label = stat;
    fixture.detectChanges();
    const rateElement = debugElement.nativeElement.querySelector('.rate');
    const statElement = debugElement.nativeElement.querySelector('.stat');
    expect(rateElement.textContent).toBe(String(rate));
    expect(statElement.textContent).toBe('Force');
  });
});
