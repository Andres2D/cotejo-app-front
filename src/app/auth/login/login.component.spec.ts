import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { ComponentsModule } from '../../components/components.module';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';

const fakeAuthService = {
  login() {}
}

const mockResponse = {
  ok: false,
  msg: 'User invalid'
};

function setUp() {
  TestBed.configureTestingModule({
    imports: [
      ComponentsModule, 
      ReactiveFormsModule, 
      RouterTestingModule,
      HttpClientTestingModule
    ],
    providers: [
      {
        provide: AuthService,
        useValue: fakeAuthService
      }
    ],
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

  it('should render alert component', () => {
    const { component, fixture, element } = setUp();
    component.showAlert = true;
    fixture.detectChanges();
    const alert = element.nativeElement.querySelector('.alert');
    expect(alert).toBeTruthy();
  });

  it('should close alert component', () => {
    const { component, fixture, element } = setUp();
    component.showAlert = true;
    fixture.detectChanges();
    let alert = element.nativeElement.querySelector('.alert');
    expect(alert).toBeTruthy();
    component.close();
    fixture.detectChanges();
    alert = element.nativeElement.querySelector('.alert');
    console.log(component.showAlert);
    expect(alert).not.toBeTruthy();
  });

  it('should not login when form is invalid', () => {
    const { component, element, fixture } = setUp();
    const comSpy = jest.spyOn(component, 'login');
    const servSpy = jest.spyOn(fakeAuthService, 'login');
    fixture.detectChanges();
    component.loginForm.controls['email'].setValue('wrong');
    component.loginForm.controls['password'].setValue('111');
    const button = element.nativeElement.querySelector('.login-btn');
    button.click();
    fixture.detectChanges();
    expect(comSpy).toHaveBeenCalled();
    expect(servSpy).not.toHaveBeenCalled();
  });

  it('should login when form is valid', () => {
    const { component, element, fixture } = setUp();
    const comSpy = jest.spyOn(component, 'login');
    const servSpy = jest.spyOn(fakeAuthService, 'login');
    fixture.detectChanges();
    component.loginForm.controls['email'].setValue('prueba@mail.com');
    component.loginForm.controls['password'].setValue('111');
    const button = element.nativeElement.querySelector('.login-btn');
    button.click();
    fixture.detectChanges();
    expect(comSpy).toHaveBeenCalled();
    expect(servSpy).toHaveBeenCalled();
  });
});
