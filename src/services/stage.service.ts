// stage.service.ts
import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { Stage } from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class StageService {
    private storeName = 'stages';

    constructor(private dbService: DatabaseService) { }

    async addStage(stage: Omit<Stage, 'id_stage' | 'created_at'>): Promise<Stage> {
        return this.dbService.add<Stage>(this.storeName, stage);
    }

    async getStages(): Promise<Stage[]> {
        return this.dbService.getAll<Stage>(this.storeName);
    }

    async getStage(id: number): Promise<Stage | undefined> {
        return this.dbService.getById<Stage>(this.storeName, id);
    }

    async updateStage(id: number, data: Partial<Stage>): Promise<Stage> {
        return this.dbService.update<Stage>(this.storeName, id, data);
    }

    async deleteStage(id: number): Promise<void> {
        return this.dbService.delete(this.storeName, id);
    }

    async getStagesByRecipe(recipeId: number): Promise<Stage[]> {
        return this.dbService.executeNativeQuery<Stage>(
            'SELECT * FROM stages WHERE id_recipe = ? ORDER BY order_num',
            [recipeId]
        );
    }
}