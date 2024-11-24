import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { CategorieCardModule } from '../categorie-card/categorie-card.module';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    CategorieCardModule
  ], exports: [
    SearchComponent
  ]
})
export class SearchModule { }
