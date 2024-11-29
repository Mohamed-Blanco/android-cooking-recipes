import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { recipesCardComponent } from './recips-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [recipesCardComponent],
  imports: [
    CommonModule, RouterModule
  ], exports: [
    recipesCardComponent
  ]
})
export class recipesCardModule { }
