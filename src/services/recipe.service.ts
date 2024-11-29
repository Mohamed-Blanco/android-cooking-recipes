import { Injectable } from '@angular/core';
import { Recipe } from '../models/models';
import { Database, ref, get, query, orderByChild, equalTo, limitToFirst, remove, set, update } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private collection = 'recipes';

    constructor(private db: Database) { }

    async addRecipe(recipe: Omit<Recipe, 'created_at'>): Promise<void> {
        const recipeRef = ref(this.db, `${this.collection}/${recipe.id_recipe}`);
        await set(recipeRef, recipe);
    }

    async getRecipes(): Promise<Recipe[]> {
        const snapshot = await get(ref(this.db, this.collection));
        return snapshot.exists() ? Object.values(snapshot.val()) as Recipe[] : [];
    }

    async getRecipesLimited(limit: number): Promise<Recipe[]> {
        const recipesRef = ref(this.db, this.collection);
        const recipesQuery = query(recipesRef, limitToFirst(limit));

        const snapshot = await get(recipesQuery);

        if (snapshot.exists()) {
            const recipesData = snapshot.val();
            return Object.keys(recipesData).map(key => ({
                ...recipesData[key],
                id: key
            }));
        }

        return [];
    }

    async getRecipeById(id: string): Promise<Recipe | null> {
        const snapshot = await get(ref(this.db, `${this.collection}/${id}`));
        return snapshot.exists() ? snapshot.val() as Recipe : null;
    }

    async getRecipesByCategoryId(categoryId: string, limit: number = 10): Promise<Recipe[]> {
        const recipesQuery = query(
            ref(this.db, this.collection),
            orderByChild('id_categorie'),
            equalTo(categoryId),
            limitToFirst(limit)
        );
        const snapshot = await get(recipesQuery);
        return snapshot.exists() ? Object.values(snapshot.val()) as Recipe[] : [];
    }

    async updateRecipe(id: string, data: Partial<Recipe>): Promise<void> {
        const recipeRef = ref(this.db, `${this.collection}/${id}`);
        await update(recipeRef, data);
    }

    async deleteRecipe(id: string): Promise<void> {
        await remove(ref(this.db, `${this.collection}/${id}`));
    }
}
