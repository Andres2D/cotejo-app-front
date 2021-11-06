import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { CotejoButtonComponent } from './cotejo-button/cotejo-button.component';

@NgModule({
  declarations: [
    AlertComponent,
    CotejoButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    CotejoButtonComponent
  ]
})
export class ComponentsModule { }
