// recipe-ingredient.service.ts
import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { RecipeIngredient } from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class RecipeIngredientService {
    private storeName = 'recipe_ingredients';

    constructor(private dbService: DatabaseService) { }

    async addRecipeIngredient(recipeIngredient: Omit<RecipeIngredient, 'created_at'>): Promise<RecipeIngredient> {
        return this.dbService.add<RecipeIngredient>(this.storeName, recipeIngredient);
    }

    async getRecipeIngredients(): Promise<RecipeIngredient[]> {
        return this.dbService.getAll<RecipeIngredient>(this.storeName);
    }

    async updateRecipeIngredient(recipeId: number, ingredientId: number, data: Partial<RecipeIngredient>): Promise<RecipeIngredient> {
        const sql = `UPDATE ${this.storeName} SET quantity = ?, unit = ? WHERE id_recipe = ? AND id_ingredient = ?`;
        await this.dbService.executeNativeQuery(sql, [data.quantity, data.unit, recipeId, ingredientId]);
        return this.getRecipeIngredientByIds(recipeId, ingredientId);
    }

    async deleteRecipeIngredient(recipeId: number, ingredientId: number): Promise<void> {
        const sql = `DELETE FROM ${this.storeName} WHERE id_recipe = ? AND id_ingredient = ?`;
        await this.dbService.executeNativeQuery(sql, [recipeId, ingredientId]);
    }

    private async getRecipeIngredientByIds(recipeId: number, ingredientId: number): Promise<RecipeIngredient> {
        const sql = `SELECT * FROM ${this.storeName} WHERE id_recipe = ? AND id_ingredient = ?`;
        const results = await this.dbService.executeNativeQuery<RecipeIngredient>(sql, [recipeId, ingredientId]);
        return results[0];
    }
}