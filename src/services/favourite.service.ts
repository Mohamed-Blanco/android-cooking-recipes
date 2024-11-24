// favorite.service.ts
import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { Favorite } from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private storeName = 'favorites';

    constructor(private dbService: DatabaseService) { }

    async addFavorite(favorite: Omit<Favorite, 'created_at'>): Promise<Favorite> {
        return this.dbService.add<Favorite>(this.storeName, favorite);
    }

    async getFavorites(): Promise<Favorite[]> {
        return this.dbService.getAll<Favorite>(this.storeName);
    }

    async getFavoritesByUser(userId: number): Promise<Favorite[]> {
        return this.dbService.executeNativeQuery<Favorite>(
            'SELECT * FROM favorites WHERE id_user = ?',
            [userId]
        );
    }

    async deleteFavorite(recipeId: number, userId: number): Promise<void> {
        const sql = `DELETE FROM ${this.storeName} WHERE id_recipe = ? AND id_user = ?`;
        await this.dbService.executeNativeQuery(sql, [recipeId, userId]);
    }
}