import { Routes } from '@angular/router';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterInComponent } from './components/register-in/register-in.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RecipsOverviewComponent } from './components/recips-overview/recips-overview.component';
import { CategoriesComponent } from './components/categories/categories.component';


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
        path: 'Recip',
        component: RecipsOverviewComponent
      },
      {
        path: 'Categories',
        component: CategoriesComponent
        , children: [
          {
            path: 'Categorie1',
            component: RegisterInComponent

          },
          {
            path: 'Categorie2',
            component: SearchComponent

          },
        ]
      },

    ]
  },
  {
    path: 'Register',
    component: RegisterInComponent
  },


];

export default routes;
