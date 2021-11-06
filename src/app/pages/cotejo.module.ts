import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotejoRoutingModule } from './cotejo-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    CotejoRoutingModule,
    ComponentsModule
  ]
})
export class CotejoModule { }
