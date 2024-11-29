import { Injectable } from '@angular/core';
import { Material } from '../models/models';
import { Database, ref, get, set, update, remove, equalTo, orderByChild, query } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class MaterialService {
    private collection = 'materials';

    constructor(private db: Database) { }

    async addMaterial(material: Omit<Material, 'created_at'>): Promise<void> {
        const materialRef = ref(this.db, `${this.collection}/${material.id_material}`);
        await set(materialRef, material);
    }

    async getMaterials(): Promise<Material[]> {
        const snapshot = await get(ref(this.db, this.collection));
        return snapshot.exists() ? Object.values(snapshot.val()) as Material[] : [];
    }

    async getMaterialsByRecipeId(id_recipe: string): Promise<Material[]> {
        try {
            // Query materials for the specific recipe
            const materialsRef = ref(this.db, `${this.collection}/materials`);
            const materialsQuery = query(
                materialsRef,
                orderByChild('id_recipe'),
                equalTo(id_recipe)
            );

            const snapshot = await get(materialsQuery);

            if (snapshot.exists()) {
                // Convert the snapshot to an array of materials
                const materials = snapshot.val();
                return Object.values(materials) as Material[];
            }

            return [];
        } catch (error) {
            console.error('Error fetching materials:', error);
            return [];
        }
    }


    async getMaterialById(id: string): Promise<Material | null> {
        const snapshot = await get(ref(this.db, `${this.collection}/${id}`));
        return snapshot.exists() ? snapshot.val() as Material : null;
    }

    async updateMaterial(id: string, data: Partial<Material>): Promise<void> {
        const materialRef = ref(this.db, `${this.collection}/${id}`);
        await update(materialRef, data);
    }

    async deleteMaterial(id: string): Promise<void> {
        await remove(ref(this.db, `${this.collection}/${id}`));
    }

}
