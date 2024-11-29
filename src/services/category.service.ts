import { Injectable } from '@angular/core';
import { Category } from '../models/models';
import { Database, ref, get, set, update, remove, limitToFirst, query } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private collection = 'categories';

    constructor(private db: Database) { }

    async addCategory(category: Omit<Category, 'created_at'>): Promise<void> {
        const categoryRef = ref(this.db, `${this.collection}/${category.id_categorie}`);
        await set(categoryRef, category);
    }

    async getCategories(): Promise<Category[]> {
        const snapshot = await get(ref(this.db, this.collection));
        return snapshot.exists() ? Object.values(snapshot.val()) as Category[] : [];
    }

    async getTenCategories(): Promise<Category[]> {
        const categoriesQuery = query(ref(this.db, this.collection), limitToFirst(10)); // Limit to first 10
        const snapshot = await get(categoriesQuery);
        return snapshot.exists() ? Object.values(snapshot.val()) as Category[] : [];
    }

    async getThreeCategories(): Promise<Category[]> {
        const categoriesQuery = query(ref(this.db, this.collection), limitToFirst(3)); // Limit to first 10
        const snapshot = await get(categoriesQuery);
        return snapshot.exists() ? Object.values(snapshot.val()) as Category[] : [];
    }

    async getCategoryById(id: string): Promise<Category | null> {
        const snapshot = await get(ref(this.db, `${this.collection}/${id}`));
        return snapshot.exists() ? snapshot.val() as Category : null;
    }

    async updateCategory(id: string, data: Partial<Category>): Promise<void> {
        const categoryRef = ref(this.db, `${this.collection}/${id}`);
        await update(categoryRef, data);
    }

    async deleteCategory(id: string): Promise<void> {
        await remove(ref(this.db, `${this.collection}/${id}`));
    }
}
