import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FavoriteComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [FavoriteComponent]
})
export class FavoriteModule { }
