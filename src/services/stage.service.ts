import { Injectable } from '@angular/core';
import { Stage } from '../models/models';
import { Database, ref, get, set, update, remove, equalTo, orderByChild, query } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class StageService {
    private collection = 'stages';

    constructor(private db: Database) { }

    async addStage(stage: Omit<Stage, 'created_at'>): Promise<void> {
        const stageRef = ref(this.db, `${this.collection}/${stage.id_stage}`);
        await set(stageRef, stage);
    }

    async getStages(): Promise<Stage[]> {
        const snapshot = await get(ref(this.db, this.collection));
        return snapshot.exists() ? Object.values(snapshot.val()) as Stage[] : [];
    }

    async getStageById(id_recipe: string): Promise<Stage[] | null> {
        try {
            // Query stages for the specific recipe
            const stagesRef = ref(this.db, `${this.collection}/stages`);
            const stagesQuery = query(
                stagesRef,
                orderByChild('id_recipe'),
                equalTo(id_recipe)
            );

            const snapshot = await get(stagesQuery);

            if (snapshot.exists()) {
                // Convert the snapshot to an array of stages
                const stages = snapshot.val();
                return Object.values(stages) as Stage[];
            }

            return null;
        } catch (error) {
            console.error('Error fetching stages:', error);
            return null;
        }
    }

    async updateStage(id: string, data: Partial<Stage>): Promise<void> {
        const stageRef = ref(this.db, `${this.collection}/${id}`);
        await update(stageRef, data);
    }

    async deleteStage(id: string): Promise<void> {
        await remove(ref(this.db, `${this.collection}/${id}`));
    }
}
