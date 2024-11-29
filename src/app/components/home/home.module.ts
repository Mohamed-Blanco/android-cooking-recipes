import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavigationBarModule } from '../navigation-bar/navigation-bar.module';
import { TopBarModule } from '../top-bar/top-bar.module';
import { RouterModule } from '@angular/router';
import { CategorieCardModule } from "../categorie-card/categorie-card.module";
import { recipesCardModule } from "../event-card/recips-card.module";
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../loading/loading.module';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NavigationBarModule,
    TopBarModule,
    RouterModule,
    CategorieCardModule,
    recipesCardModule,
    FormsModule,
    LoadingModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
