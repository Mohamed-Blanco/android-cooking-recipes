import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipsOverviewComponent } from './recips-overview.component';
import { CostumhrModule } from '../costumhr/costumhr.module';



@NgModule({
  declarations: [RecipsOverviewComponent],
  imports: [
    CommonModule,
    CostumhrModule
  ],
  exports: [
    RecipsOverviewComponent
  ]
})
export class RecipsOverviewModule { }
