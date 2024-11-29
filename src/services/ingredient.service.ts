import { Injectable } from '@angular/core';
import { Ingredient } from '../models/models';
import { Database, ref, get, set, update, remove, equalTo, orderByChild, query } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class IngredientService {
    private collection = 'ingredients';

    constructor(private db: Database) { }

    async addIngredient(ingredient: Omit<Ingredient, 'created_at'>): Promise<void> {
        const ingredientRef = ref(this.db, `${this.collection}/${ingredient.id_ingredient}`);
        await set(ingredientRef, ingredient);
    }

    async getIngredients(): Promise<Ingredient[]> {
        const snapshot = await get(ref(this.db, this.collection));
        return snapshot.exists() ? Object.values(snapshot.val()) as Ingredient[] : [];
    }


    async getIngredientsByRecipeId(id_recipe: string): Promise<Ingredient[]> {
        try {
            // Query ingredients for the specific recipe
            const ingredientsRef = ref(this.db, `${this.collection}/ingredients`);
            const ingredientsQuery = query(
                ingredientsRef,
                orderByChild('id_recipe'),
                equalTo(id_recipe)
            );

            const snapshot = await get(ingredientsQuery);

            if (snapshot.exists()) {
                // Convert the snapshot to an array of ingredients
                const ingredients = snapshot.val();
                return Object.values(ingredients) as Ingredient[];
            }

            return [];
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            return [];
        }
    }

    async getIngredientById(id: string): Promise<Ingredient | null> {
        const snapshot = await get(ref(this.db, `${this.collection}/${id}`));
        return snapshot.exists() ? snapshot.val() as Ingredient : null;
    }

    async updateIngredient(id: string, data: Partial<Ingredient>): Promise<void> {
        const ingredientRef = ref(this.db, `${this.collection}/${id}`);
        await update(ingredientRef, data);
    }

    async deleteIngredient(id: string): Promise<void> {
        await remove(ref(this.db, `${this.collection}/${id}`));
    }
}
