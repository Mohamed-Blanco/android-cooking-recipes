// recipe-material.service.ts
import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { RecipeMaterial } from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class RecipeMaterialService {
    private storeName = 'recipe_materials';

    constructor(private dbService: DatabaseService) { }

    async addRecipeMaterial(recipeMaterial: Omit<RecipeMaterial, 'created_at'>): Promise<RecipeMaterial> {
        return this.dbService.add<RecipeMaterial>(this.storeName, recipeMaterial);
    }

    async getRecipeMaterials(): Promise<RecipeMaterial[]> {
        return this.dbService.getAll<RecipeMaterial>(this.storeName);
    }

    async updateRecipeMaterial(recipeId: number, materialId: number, data: Partial<RecipeMaterial>): Promise<RecipeMaterial> {
        const sql = `UPDATE ${this.storeName} SET quantity = ? WHERE id_recipe = ? AND id_material = ?`;
        await this.dbService.executeNativeQuery(sql, [data.quantity, recipeId, materialId]);
        return this.getRecipeMaterialByIds(recipeId, materialId);
    }

    async deleteRecipeMaterial(recipeId: number, materialId: number): Promise<void> {
        const sql = `DELETE FROM ${this.storeName} WHERE id_recipe = ? AND id_material = ?`;
        await this.dbService.executeNativeQuery(sql, [recipeId, materialId]);
    }

    private async getRecipeMaterialByIds(recipeId: number, materialId: number): Promise<RecipeMaterial> {
        const sql = `SELECT * FROM ${this.storeName} WHERE id_recipe = ? AND id_material = ?`;
        const results = await this.dbService.executeNativeQuery<RecipeMaterial>(sql, [recipeId, materialId]);
        return results[0];
    }
}