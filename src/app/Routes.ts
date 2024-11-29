import { Routes } from '@angular/router';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterInComponent } from './components/register-in/register-in.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RecipsOverviewComponent } from './components/recips-overview/recips-overview.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { OnecategorieoverviewComponent } from './components/onecategorieoverview/onecategorieoverview.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: '/Landing/Home', // Default route
    pathMatch: 'full'
  },
  {
    path: "Landing",
    component: LandingPageComponent,
    children: [
      {
        path: 'Home',
        component: HomeComponent
      },
      {
        path: 'Settings',
        component: SettingsComponent
      },
      {
        path: 'Favourites',
        component: FavoriteComponent
      },
      {
        path: 'Search',
        component: SearchComponent
      },
      {
        path: 'Recip/:recipeId',
        component: RecipsOverviewComponent
      },

      {
        path: 'Categories',
        component: CategoriesComponent

      },

      {
        path: 'overview/:CategorieId',
        component: OnecategorieoverviewComponent
      },

    ]
  },
  {
    path: 'Register',
    component: RegisterInComponent
  },


];

export default routes;
