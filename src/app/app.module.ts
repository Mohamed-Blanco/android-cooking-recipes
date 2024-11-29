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
import { environment } from '../envirements/envirement';


import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { importProvidersFrom } from '@angular/core';
import { SettingsModule } from './components/settings/settings.module';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { RegisterInModule } from './components/register-in/register-in.module';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingModule } from './components/loading/loading.module';
import { OnecategorieoverviewComponent } from './components/onecategorieoverview/onecategorieoverview.component';
import { OnecategorieoverviewModule } from './components/onecategorieoverview/onecategorieoverview.module';
import { GlobalsVariables } from '../envirements/globals';


@NgModule({
  declarations: [AppComponent,]
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
    SettingsModule,
    FormsModule,
    RegisterInModule,
    LoadingModule
    , OnecategorieoverviewModule
  ],
  providers: [
    GlobalsVariables,
    SQLite,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
