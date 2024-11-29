
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { Category, Recipe, User } from '../../../models/models';
import { CategoryService } from '../../../services/category.service';
import { getDatabase, ref, get } from 'firebase/database';
import { RecipeService } from '../../../services/recipe.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  loading: boolean = true;
  async ngOnInit() {

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      this.listcategories = await this.categoryService.getTenCategories();
      this.categories = await this.categoryService.getThreeCategories();
      this.loading = false;
      this.getTenRecipesbyCategorie();
      console.log('Categories:', this.categories);
      console.log('List Categories:', this.listcategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  categories!: Category[];
  listcategories !: Category[];
  recipes !: Recipe[];
  test !: string;
  constructor(private recipesService: RecipeService, private userService: UserService, private categoryService: CategoryService) {


  }



  RecipsForyou: Recipe[];
  RecipsCategorie1: Recipe[];
  RecipsCategorie2: Recipe[];

  async getTenRecipesbyCategorie() {
    this.RecipsForyou = await this.recipesService.getRecipesByCategoryId(this.categories[0].id_categorie);
    this.RecipsCategorie1 = await this.recipesService.getRecipesByCategoryId(this.categories[1].id_categorie);
    this.RecipsCategorie2 = await this.recipesService.getRecipesByCategoryId(this.categories[2].id_categorie);
  }

} 
