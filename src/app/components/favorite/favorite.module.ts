import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite.component';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [FavoriteComponent],
  imports: [
    CommonModule,
    RouterModule,
    LoadingModule
  ],
  exports: [FavoriteComponent]
})
export class FavoriteModule { }
