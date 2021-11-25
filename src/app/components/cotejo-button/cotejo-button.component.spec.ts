import { first } from 'rxjs/operators';
import {  TestBed } from '@angular/core/testing';
import { CotejoButtonComponent } from './cotejo-button.component';

describe('CotejoButtonComponent', () => {
  it('should create the component', () => {
    const component = new CotejoButtonComponent();
    expect(component).toBeTruthy();
  });

  it('should init the properties', (done) => {
    const component = new CotejoButtonComponent();
    expect(component.label).toBe('default');
    expect(component.type).toBe('default');
    component.goTo.pipe(first())
      .subscribe(emit => {
        expect(emit).toBe('');
        done();
      });
    component.emitAction();
  });

  it('should render the button label', () => {
    TestBed.configureTestingModule({ declarations: [CotejoButtonComponent] });
    const fixture = TestBed.createComponent(CotejoButtonComponent);
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    const labelButton: string = 'Label test';
    component.label = labelButton;
    fixture.detectChanges();
    const button = debugElement.nativeElement.querySelector('.big-button');
    console.log(button.textContent);
    expect(button.textContent.trim()).toBe(labelButton);
  });

});
