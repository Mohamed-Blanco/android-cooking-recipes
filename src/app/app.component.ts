import { Component, OnInit } from '@angular/core';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
//import { FirebaseService } from '../services/firebase.service';
import { getDatabase, ref, get } from 'firebase/database';
import { DatabaseTable } from '../models/database.model';
//import { DatabaseService } from '../services/database.service';
import { databaseInstance$ } from '@angular/fire/database';
import { CategoryService } from '../services/category.service';
import { CdkPortal } from '@angular/cdk/portal';
import { Category, Favorite, Ingredient, Material, Recipe, RecipeIngredient, RecipeWithDetails, SearchQuery, Stage, UserWithFavorites } from '../models/models';
import { RecipeService } from '../services/recipe.service';
import { StageService } from '../services/stage.service';
import { MaterialService } from '../services/material.service';
import { IngredientService } from '../services/ingredient.service';
//import { RecipeIngredientService } from '../services/recipeIngredient.service';
import { FavoriteService } from '../services/favourite.service';
import { SearchQueryService } from '../services/searchQuery.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'NewyorkEvents';



  constructor(private favoriteService: FavoriteService, private searchQueryService: SearchQueryService, private ingredientService: IngredientService, private materialService: MaterialService, private stageService: StageService, private categorieService: CategoryService, private recipeService: RecipeService) {
  }



  ngOnInit(): void {
    this.fetchAllData();
  }

  fetchAllData() {
    const db = getDatabase();
    const dataRef = ref(db, 'recipe_database');
    get(dataRef).then((snapshot) => {
      if (snapshot.exists()) {
        const firebaseData = snapshot.val();
        this.insertDataIntoSQLite(firebaseData);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  async insertDataIntoSQLite(data: any) {
    // Process in order of dependencies
    await this.fetchCategories(data);
    await this.fetchRecipes(data);
    await this.fetchStages(data);
    await this.fetchMaterials(data);
    await this.fetchIngredients(data);
    await this.fetchSearchQueries(data);
  }

  async fetchCategories(data: any) {
    const categories = data.categories;

    for (const categoryId in categories) {
      const category = categories[categoryId];
      const newCategory: Omit<Category, ''> = {
        id_categorie: categoryId,
        name: category.name,
        description: category.description || '',
        created_at: category.created_at || new Date().toISOString()
      };

      await this.categorieService.addCategory(newCategory);
      console.log("Category added:", newCategory);
    }
  }

  async fetchRecipes(data: any) {
    const recipes = data.recipes;

    for (const recipeId in recipes) {
      const recipe = recipes[recipeId];
      const newRecipe: Omit<Recipe, ''> = {
        id_recipe: recipeId,
        title: recipe.title,
        image_url: recipe.image_url,
        weight: recipe.weight,
        time: recipe.time,
        timeToResults: recipe.timeToResults,
        preparation_time: recipe.preparation_time,
        region: recipe.region,
        cuisine: recipe.cuisine,
        id_categorie: recipe.id_categorie,
        created_at: recipe.created_at || new Date().toISOString(),
        description: recipe.description,
        leveldefficultie: recipe.leveldefficultie,
        burningtime: recipe.burningtime,
        repostime: recipe.repostime
      };

      await this.recipeService.addRecipe(newRecipe);
      console.log("Recipe added:", newRecipe);
    }
  }

  async fetchStages(data: any) {
    const stages = data.stages;

    for (const stageId in stages) {
      const stage = stages[stageId];
      const newStage: Omit<Stage, ''> = {
        id_stage: stageId,
        id_recipe: stage.id_recipe,
        description: stage.description,
        order_num: stage.order_num,
        created_at: stage.created_at || new Date().toISOString()
      };

      await this.stageService.addStage(newStage);
      console.log("Stage added:", newStage);
    }
  }

  async fetchMaterials(data: any) {
    const materials = data.materials;

    for (const materialId in materials) {
      const material = materials[materialId];

      const newMaterial: Omit<Material, ''> = {
        id_material: materialId,
        title_material: material.title_material,
        created_at: material.created_at || new Date().toISOString(),
        id_recipe: material.id_recipe
      };

      await this.materialService.addMaterial(newMaterial);
      console.log("Material added:", newMaterial);
    }
  }



  async fetchIngredients(data: any) {
    const ingredients = data.ingredients;

    for (const ingredientId in ingredients) {
      const ingredient = ingredients[ingredientId];
      const newIngredient: Omit<Ingredient, ''> = {
        id_ingredient: ingredientId,
        id_categorie: ingredient.id_categorie,
        name_ingredient: ingredient.name_ingredient,
        weight: ingredient.weight,
        created_at: ingredient.created_at || new Date().toISOString(),
        id_recipe: ingredient.id_recipe,
      };

      await this.ingredientService.addIngredient(newIngredient);
      console.log("Ingredient added:", newIngredient);
    }
  }





  async fetchSearchQueries(data: any) {
    const searchQueries = data.searchQueries;

    for (const searchQueryId in searchQueries) {
      const searchQuery = searchQueries[searchQueryId];
      const newSearchQuery: Omit<SearchQuery, ''> = {
        id_search: searchQueryId,
        user_id: searchQuery.user_id,
        searchQuery: searchQuery.searchQuery,
        created_at: searchQuery.created_at || new Date().toISOString()
      };

      await this.searchQueryService.addSearchQuery(newSearchQuery);
      console.log("SearchQuery added:", newSearchQuery);
    }
  }


}
