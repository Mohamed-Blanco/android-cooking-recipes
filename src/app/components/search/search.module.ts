import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { CategorieCardModule } from '../categorie-card/categorie-card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    CategorieCardModule, FormsModule, ReactiveFormsModule, RouterModule, LoadingModule
  ], exports: [
    SearchComponent
  ]
})
export class SearchModule { }
