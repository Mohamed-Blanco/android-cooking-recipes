import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewCatComponent } from './overview-cat.component';



@NgModule({
  declarations: [OverviewCatComponent],
  imports: [
    CommonModule
  ], exports: [OverviewCatComponent]
})
export class OverviewCatModule { }
