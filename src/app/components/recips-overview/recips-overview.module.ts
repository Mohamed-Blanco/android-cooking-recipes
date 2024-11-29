import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipsOverviewComponent } from './recips-overview.component';
import { CostumhrModule } from '../costumhr/costumhr.module';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [RecipsOverviewComponent],
  imports: [
    CommonModule,
    CostumhrModule,
    LoadingModule
  ],
  exports: [
    RecipsOverviewComponent
  ]
})
export class RecipsOverviewModule { }
