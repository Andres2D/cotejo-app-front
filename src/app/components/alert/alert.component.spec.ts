import { first } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  
  it('should create the component', () => {
    const component = new AlertComponent();
    expect(component).toBeTruthy();
  });

  it('should init propeties', (done) => {
    const component = new AlertComponent();
    expect(component.type).toBe('error');
    expect(component.message).toBe('');
    expect(component.close).toBeTruthy();

    component.closeAction.pipe(first())
      .subscribe(emitAction => {
        expect(emitAction).toBe('');
        done();
      });

    component.emitAction();
  });

  it('should render the message', () => {
    TestBed.configureTestingModule({ declarations: [AlertComponent] });
    const fixture = TestBed.createComponent(AlertComponent);
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    const message: string = 'This is a test message';
    component.message = message;
    fixture.detectChanges();
    const messageText = debugElement.nativeElement.querySelector('.msg');
    expect(messageText.textContent).toBe(message);
  });

});
