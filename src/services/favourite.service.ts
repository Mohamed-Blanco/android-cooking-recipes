import { Injectable } from '@angular/core';
import { Favorite, Recipe } from '../models/models';
import { Database, ref, get, set, update, remove, equalTo, orderByChild, query, push } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private collection = 'favorites';

    constructor(private db: Database) { }


    async addFavorite(favorite: Omit<Favorite, 'created_at'>): Promise<void> {
        try {
            // Generate a new unique key for the favorite entry
            const newFavoriteRef = push(ref(this.db, `${this.collection}/favorites`));

            // Create the favorite object with a timestamp
            const favoriteToSave = {
                ...favorite,
                created_at: new Date().toISOString()
            };

            // Save the favorite entry
            await set(newFavoriteRef, favoriteToSave);
        } catch (error) {
            console.error('Error adding favorite:', error);
            throw error;
        }
    }

    async getFavorites(): Promise<Favorite[]> {
        const snapshot = await get(ref(this.db, this.collection));
        return snapshot.exists() ? Object.values(snapshot.val()) as Favorite[] : [];
    }




    async getFavoriteById(id: string): Promise<Favorite | null> {
        const snapshot = await get(ref(this.db, `${this.collection}/${id}`));
        return snapshot.exists() ? snapshot.val() as Favorite : null;
    }



    async updateFavorite(id: string, data: Partial<Favorite>): Promise<void> {
        const favoriteRef = ref(this.db, `${this.collection}/${id}`);
        await update(favoriteRef, data);
    }

    async deleteFavorite(id_user: string, id_recipe: string): Promise<void> {
        try {
            // Find the specific favorite entry for the user and recipe
            const favoritesRef = ref(this.db, `${this.collection}/favorites`);
            const favoritesQuery = query(
                favoritesRef,
                orderByChild('id_user'),
                equalTo(id_user)
            );

            const snapshot = await get(favoritesQuery);

            if (snapshot.exists()) {
                // Find the specific favorite entry to delete
                const favorites = snapshot.val();
                const favoriteToDelete = Object.entries(favorites).find(
                    ([key, favorite]) =>
                        (favorite as any).id_recipe === id_recipe &&
                        (favorite as any).id_user === id_user
                );

                if (favoriteToDelete) {
                    // Remove the specific favorite entry
                    const [favoriteKey] = favoriteToDelete;
                    await remove(ref(this.db, `${this.collection}/favorites/${favoriteKey}`));
                }
            }
        } catch (error) {
            console.error('Error deleting favorite:', error);
            throw error;
        }
    }

    async checkFavorite(id_user: string, id_recipe: string): Promise<boolean> {
        const favoriteRef = ref(this.db, `${this.collection}`); // Reference to all favorites

        try {
            // Get the snapshot of all favorites
            const snapshot = await get(favoriteRef);
            if (snapshot.exists()) {
                const favorites = snapshot.val(); // Get the data under favorites

                // Check if there's any favorite for the user with the specific recipe
                for (const favId in favorites) {
                    const favorite = favorites[favId];
                    if (favorite.id_user === id_user && favorite.id_recipe === id_recipe) {
                        // If the user and recipe match, it's a favorite
                        return true;
                    }
                }
            }
            // If no favorite found, return false
            return false;
        } catch (error) {
            console.error('Error checking favorite:', error);
            return false; // Return false in case of error
        }
    }

    async getRecipesFavoritedByUser(id_user: string): Promise<Recipe[] | null> {
        try {
            // First, find all favorites for the specific user
            const favoritesQuery = query(
                ref(this.db, `${this.collection}/favorites`),
                orderByChild('id_user'),
                equalTo(id_user)
            );

            const favoritesSnapshot = await get(favoritesQuery);

            if (!favoritesSnapshot.exists()) {
                return null;
            }

            // Extract the favorite recipe IDs
            const favorites = favoritesSnapshot.val();
            const favoriteRecipeIds = Object.values(favorites).map((fav: any) => fav.id_recipe);

            // Fetch the full recipe details for each favorite
            const recipesPromises = favoriteRecipeIds.map(async (recipeId: string) => {
                const recipeSnapshot = await get(ref(this.db, `${this.collection}/recipes/${recipeId}`));
                return recipeSnapshot.exists() ? recipeSnapshot.val() : null;
            });

            // Wait for all recipe details to be fetched
            const recipes = await Promise.all(recipesPromises);

            // Filter out any null results
            return recipes.filter(recipe => recipe !== null);
        } catch (error) {
            console.error('Error fetching favorited recipes:', error);
            return null;
        }
    }


}
