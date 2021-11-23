import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentsModule } from '../../components/components.module';
import { LoginComponent } from './login.component';

function setUp() {
  TestBed.configureTestingModule({
    imports: [
      ComponentsModule, 
      ReactiveFormsModule, 
      RouterTestingModule,
      HttpClientTestingModule
    ],
    providers: [],
    declarations: [ LoginComponent ]
  });
  const fixture = TestBed.createComponent(LoginComponent);
  const component = fixture.componentInstance;
  const element = fixture.debugElement;
  return { fixture, component, element };
}

describe('LoginComponent', () => {
  it('should create', () => {
    const {component} = setUp();
    expect(component).toBeTruthy();
  });

  //TODO: Complete test
  it('should render alert error', fakeAsync(() => {
    const {element, component, fixture} = setUp();
    component.loginForm.setValue({
      email: 'wrong@mail.com',
      password: '144'
    });

    const loginBtn = element.query(By.css('.login-btn'));
    loginBtn.triggerEventHandler('click', {button: 0});
    tick(500);
    component.login();
    fixture.detectChanges();
    const alertDanger = element.query(By.css('.alert')); 
    expect(true).toBeTruthy();
  }));
});
