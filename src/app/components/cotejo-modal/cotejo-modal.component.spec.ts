import { first } from 'rxjs/operators';
import { CotejoModalComponent } from './cotejo-modal.component';

describe('CotejoModalComponent', () => {
  it('should create the component', () => {
    const component = new CotejoModalComponent();
    expect(component).toBeTruthy();
  });

  it('should init the properties', (done) => {
    const component = new CotejoModalComponent();
    expect(component.close).toBeTruthy();
    component.actionClose.pipe(first())
      .subscribe(emit => {
        expect(emit).toBe('');
        done();
      });
    component.emitClose();
  });
});
