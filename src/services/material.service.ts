// material.service.ts
import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { Material } from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class MaterialService {
    private storeName = 'materials';

    constructor(private dbService: DatabaseService) { }

    async addMaterial(material: Omit<Material, 'id_material' | 'created_at'>): Promise<Material> {
        return this.dbService.add<Material>(this.storeName, material);
    }

    async getMaterials(): Promise<Material[]> {
        return this.dbService.getAll<Material>(this.storeName);
    }

    async getMaterial(id: number): Promise<Material | undefined> {
        return this.dbService.getById<Material>(this.storeName, id);
    }

    async updateMaterial(id: number, data: Partial<Material>): Promise<Material> {
        return this.dbService.update<Material>(this.storeName, id, data);
    }

    async deleteMaterial(id: number): Promise<void> {
        return this.dbService.delete(this.storeName, id);
    }
}