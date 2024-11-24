// ingredient.service.ts
import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { Ingredient } from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class IngredientService {
    private storeName = 'ingredients';

    constructor(private dbService: DatabaseService) { }

    async addIngredient(ingredient: Omit<Ingredient, 'id_ingredient' | 'created_at'>): Promise<Ingredient> {
        return this.dbService.add<Ingredient>(this.storeName, ingredient);
    }

    async getIngredients(): Promise<Ingredient[]> {
        return this.dbService.getAll<Ingredient>(this.storeName);
    }

    async getIngredient(id: number): Promise<Ingredient | undefined> {
        return this.dbService.getById<Ingredient>(this.storeName, id);
    }

    async updateIngredient(id: number, data: Partial<Ingredient>): Promise<Ingredient> {
        return this.dbService.update<Ingredient>(this.storeName, id, data);
    }

    async deleteIngredient(id: number): Promise<void> {
        return this.dbService.delete(this.storeName, id);
    }
}