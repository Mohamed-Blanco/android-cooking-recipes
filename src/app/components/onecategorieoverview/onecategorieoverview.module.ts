import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnecategorieoverviewComponent } from './onecategorieoverview.component';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [OnecategorieoverviewComponent],
  imports: [
    CommonModule,
    LoadingModule
  ],
  exports: [OnecategorieoverviewComponent]
})
export class OnecategorieoverviewModule { }
