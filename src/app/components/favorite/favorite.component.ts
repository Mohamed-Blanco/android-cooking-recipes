import { Component, OnInit } from '@angular/core';
import { Favorite, Recipe, User } from '../../../models/models';
import { FavoriteService } from '../../../services/favourite.service';
import { RecipeService } from '../../../services/recipe.service';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {


  constructor(private favouriteService: FavoriteService, private recipesService: RecipeService, private userService: UserService) {

  }

  loading: boolean = true;
  favourites !: Favorite[];
  recipes !: Recipe[] | null;
  userId = 0;
  user !: User | null;


  async ngOnInit() {
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const user = await this.userService.getCurrentUser();

      // Add a null check before accessing id_user
      if (user) {
        this.user = user;
        this.recipes = await this.favouriteService.getRecipesFavoritedByUser(user.id_user) || [];
      } else {
        this.user = null;
        this.recipes = [];
        // Optionally handle the case where no user is found
        console.warn('No current user found');
      }

      this.loading = false;
    } catch (error) {
      console.error('Error fetching user or favorites:', error);
      this.user = null;
      this.recipes = [];
      this.loading = false;
    }
  }

  async removefromfavorites(recipe: Recipe) {

    if (this.user) {
      let favourite: Favorite = {
        id_recipe: recipe.id_recipe,
        id_user: this.user.id_user
      };

      await this.favouriteService.deleteFavorite(this.user.id_user, recipe.id_recipe);
      this.recipes = await this.favouriteService.getRecipesFavoritedByUser(this.user.id_user);
    }


  }

  Search = false;




}
