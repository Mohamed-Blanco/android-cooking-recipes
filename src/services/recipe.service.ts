import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { Recipe, RecipeWithDetails } from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private storeName = 'recipes';

    constructor(private dbService: DatabaseService) { }

    async addRecipe(recipe: Omit<Recipe, 'id_recipe' | 'created_at'>): Promise<Recipe> {
        return this.dbService.add<Recipe>(this.storeName, recipe);
    }

    async getRecipes(): Promise<Recipe[]> {
        return this.dbService.getAll<Recipe>(this.storeName);
    }

    async getRecipe(id: number): Promise<Recipe | undefined> {
        return this.dbService.getById<Recipe>(this.storeName, id);
    }

    async updateRecipe(id: number, data: Partial<Recipe>): Promise<Recipe> {
        return this.dbService.update<Recipe>(this.storeName, id, data);
    }

    async deleteRecipe(id: number): Promise<void> {
        return this.dbService.delete(this.storeName, id);
    }

    async getRecipeWithDetails(id: number): Promise<RecipeWithDetails | undefined> {
        const sql = `
            SELECT r.*, c.*, s.*,
                   GROUP_CONCAT(DISTINCT m.id_material, ':', m.title_material, ':', rm.quantity) as materials,
                   GROUP_CONCAT(DISTINCT i.id_ingredient, ':', i.name_ingredient, ':', ri.quantity, ':', ri.unit) as ingredients
            FROM recipes r
            LEFT JOIN categories c ON r.id_categorie = c.id_categorie
            LEFT JOIN stages s ON r.id_recipe = s.id_recipe
            LEFT JOIN recipe_materials rm ON r.id_recipe = rm.id_recipe
            LEFT JOIN materials m ON rm.id_material = m.id_material
            LEFT JOIN recipe_ingredients ri ON r.id_recipe = ri.id_recipe
            LEFT JOIN ingredients i ON ri.id_ingredient = i.id_ingredient
            WHERE r.id_recipe = ?
            GROUP BY r.id_recipe, s.id_stage`;

        return this.dbService.executeNativeQuery<RecipeWithDetails>(sql, [id]).then(results => results[0]);
    }
}