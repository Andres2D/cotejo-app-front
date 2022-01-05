import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { CotejoPlayerPreviewComponent } from './cotejo-player-preview.component';

describe('CotejoPlayerPreviewComponent', () => {

  it('should create the component', () => {
    const component = new CotejoPlayerPreviewComponent();
    expect(component).toBeTruthy();
  });

  it('should init the properties', (done) => {
    const component = new CotejoPlayerPreviewComponent();
    expect(component.img).toBe('https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray02&eyeType=Default&eyebrowType=Default&mouthType=Serious&skinColor=Brown');
    expect(component.update).toBeFalsy();
    component.emitUpdate.pipe(first())
      .subscribe(emit => {
        expect(emit).toBe('');
        done();
      });
    component.updateImage();
  });

  it('should render the player image', () => {
    TestBed.configureTestingModule({ declarations: [CotejoPlayerPreviewComponent] });
    const fixture = TestBed.createComponent(CotejoPlayerPreviewComponent);
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    const imagePreview: string = 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray02&eyeType=Default&eyebrowType=Default&mouthType=Serious&skinColor=Light';
    component.img = imagePreview;
    fixture.detectChanges();
    const image = debugElement.nativeElement.querySelector('.avatar');
    expect(image.src).toContain(imagePreview);
  });
  
});
