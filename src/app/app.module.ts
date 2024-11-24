import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarModule } from './components/top-bar/top-bar.module';
import { NavigationBarModule } from './components/navigation-bar/navigation-bar.module';
import { HomeModule } from './components/home/home.module';
import { SearchModule } from './components/search/search.module';
import { LandingPageModule } from './components/landing-page/landing-page.module';
import { FavoriteModule } from './components/favorite/favorite.module';
import { CategorieCardModule } from './components/categorie-card/categorie-card.module';
import { recipesCardModule } from './components/event-card/recips-card.module';
import { RouterModule } from '@angular/router';
import { OverviewCatModule } from './components/overview-cat/overview-cat.module';
import { RecipsOverviewModule } from './components/recips-overview/recips-overview.module';
import { CostumhrModule } from './components/costumhr/costumhr.module';
import { MatTabsModule } from '@angular/material/tabs';
import { CategoriesModule } from './components/categories/categories.module';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


@NgModule({
  declarations: [AppComponent]
  , imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationBarModule,
    TopBarModule,
    HomeModule,
    SearchModule,
    LandingPageModule,
    FavoriteModule,
    CategorieCardModule,
    recipesCardModule,
    RouterModule,
    OverviewCatModule,
    RecipsOverviewModule,
    CostumhrModule,
    CategorieCardModule,
    MatTabsModule,
    CategoriesModule,



  ],
  providers: [SQLite],
  bootstrap: [AppComponent],
})
export class AppModule { }
