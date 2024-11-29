import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Favorite, Ingredient, Material, Recipe, Stage, User } from '../../../models/models';
import { RecipeService } from '../../../services/recipe.service';
import { FavoriteService } from '../../../services/favourite.service';
import { UserService } from '../../../services/users.service';
import { StageService } from '../../../services/stage.service';
import { MaterialService } from '../../../services/material.service';
import { IngredientService } from '../../../services/ingredient.service';

@Component({
  selector: 'app-recips-overview',
  templateUrl: './recips-overview.component.html',
  styleUrl: './recips-overview.component.css'
})
export class RecipsOverviewComponent implements OnInit {

  constructor(private ingredientsService: IngredientService, private materialService: MaterialService, private stageService: StageService, private userService: UserService, private recipService: RecipeService, private favouriteService: FavoriteService) { }


  private activatedRoute = inject(ActivatedRoute);
  recipeid !: string;
  recipe: Recipe;
  user: User;
  stages: Stage[];
  checkFavourite: boolean = true;
  materials !: Material[];
  ingredients !: Ingredient[];

  loading: boolean = true;
  async ngOnInit() {

    this.recipeid = this.activatedRoute.snapshot.params['recipeId'];

    try {
      const recipe = await this.recipService.getRecipeById(this.recipeid);
      if (recipe) {
        this.recipe = recipe;
      }

      const stages = await this.stageService.getStageById(this.recipeid);
      if (stages) {
        this.stages = stages;
      }

      const user = await this.userService.getCurrentUser();
      if (user) {
        this.user = user;
      } else {
        this.user = {
          id_user: "guest",
          fullname: "guest",
          email: "guest@example.com",
          password: "",
          subscribed: false
        }
      }

      this.checkFavourite = await this.favouriteService.checkFavorite(this.recipe.id_recipe, this.user.id_user);
      this.materials = await this.materialService.getMaterialsByRecipeId(this.recipeid);
      this.ingredients = await this.ingredientsService.getIngredientsByRecipeId(this.recipeid);
      this.loading = false;

    } catch (error) {
      console.error('Error fetching categories:', error);
    }

  }

  async addtofavorite() {
    if (this.recipe) {

      let favourite: Favorite = {
        id_recipe: this.recipe.id_recipe,
        id_user: this.user.id_user
      };

      await this.favouriteService.addFavorite(favourite);
      this.checkFavourite = await this.favouriteService.checkFavorite(this.recipe.id_recipe, this.user.id_user);
    }
  }

  async removefromfavorites() {
    if (this.recipe) {
      let favourite: Favorite = {
        id_recipe: this.recipe.id_recipe,
        id_user: this.user.id_user
      };

      await this.favouriteService.deleteFavorite(favourite.id_recipe, favourite.id_user);
      this.checkFavourite = await this.favouriteService.checkFavorite(this.recipe.id_recipe, this.user.id_user);

    }

  }
}
