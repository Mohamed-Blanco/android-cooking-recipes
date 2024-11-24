
// category.service.ts
import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { Category } from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private storeName = 'categories';

    constructor(private dbService: DatabaseService) { }

    async addCategory(category: Omit<Category, 'id_categorie' | 'created_at'>): Promise<Category> {
        return this.dbService.add<Category>(this.storeName, category);
    }

    async getCategories(): Promise<Category[]> {
        return this.dbService.getAll<Category>(this.storeName);
    }

    async getCategory(id: number): Promise<Category | undefined> {
        return this.dbService.getById<Category>(this.storeName, id);
    }

    async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
        return this.dbService.update<Category>(this.storeName, id, data);
    }

    async deleteCategory(id: number): Promise<void> {
        return this.dbService.delete(this.storeName, id);
    }
}