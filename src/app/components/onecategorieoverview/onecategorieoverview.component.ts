import { Component, inject, Input } from '@angular/core';
import { Category, Favorite, Recipe, User } from '../../../models/models';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../../../services/favourite.service';
import { UserService } from '../../../services/users.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-onecategorieoverview',
  templateUrl: './onecategorieoverview.component.html',
  styleUrl: './onecategorieoverview.component.css'
})
export class OnecategorieoverviewComponent {


  user !: User;
  loading: boolean = true;
  recipes !: Recipe[];
  @Input() categorie !: Category[];
  activatedRoute = inject(ActivatedRoute);

  constructor(private recipesService: RecipeService, private favouriteService: FavoriteService, private userService: UserService, private categorieService: CategoryService) {

  }

  async removefromfavorites(recipe: Recipe) {
    let favourite: Favorite = {
      id_recipe: recipe.id_recipe,
      id_user: this.user.id_user
    };

    await this.favouriteService.deleteFavorite(favourite.id_user, favourite.id_recipe,);

  }


  category: Category;
  async ngOnInit() {
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const category = await this.categorieService.getCategoryById(this.activatedRoute.snapshot.params['CategorieId']);
      this.categorie = category ? [category] : [];
      this.recipes = await this.recipesService.getRecipesByCategoryId(this.activatedRoute.snapshot.params['CategorieId']);
      const currentUser = await this.userService.getCurrentUser();
      if (currentUser) {
        this.user = currentUser;
      } else {
        throw new Error('User not found');
      }
      this.loading = false;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

}
