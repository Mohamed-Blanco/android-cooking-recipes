import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from '../categories/categories.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatTabsModule,
    RouterModule, LoadingModule

  ], exports: [CategoriesComponent]
})
export class CategoriesModule { }
