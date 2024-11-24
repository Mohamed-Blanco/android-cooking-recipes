import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { recipesCardComponent } from './recips-card.component';



@NgModule({
  declarations: [recipesCardComponent],
  imports: [
    CommonModule
  ], exports: [
    recipesCardComponent
  ]
})
export class recipesCardModule { }
