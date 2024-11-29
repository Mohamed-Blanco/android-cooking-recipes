import { Injectable } from '@angular/core';
import { Recipe, SearchQuery } from '../models/models';
import { Database, ref, get, set, update, remove } from '@angular/fire/database';
import { equalTo, orderByChild, query } from 'firebase/database';

@Injectable({
    providedIn: 'root'
})
export class SearchQueryService {
    private collection = 'searchQueries';

    constructor(private db: Database) { }

    async addSearchQuery(query: Omit<SearchQuery, 'created_at'>): Promise<void> {
        const queryRef = ref(this.db, `${this.collection}/${query.id_search}`);
        await set(queryRef, query);
    }

    async getSearchQueries(id_user: string): Promise<SearchQuery[]> {
        try {
            // Query search queries for the specific user
            const searchQueriesRef = ref(this.db, `${this.collection}/search_queries`);
            const searchQueriesQuery = query(
                searchQueriesRef,
                orderByChild('user_id'),
                equalTo(id_user)
            );

            const snapshot = await get(searchQueriesQuery);

            if (snapshot.exists()) {
                // Convert the snapshot to an array of search queries
                const searchQueries = snapshot.val();
                return Object.values(searchQueries) as SearchQuery[];
            }

            return [];
        } catch (error) {
            console.error('Error fetching search queries:', error);
            return [];
        }
    }

    async getSearchQueryById(id: string): Promise<SearchQuery | null> {
        const snapshot = await get(ref(this.db, `${this.collection}/${id}`));
        return snapshot.exists() ? snapshot.val() as SearchQuery : null;
    }

    async updateSearchQuery(id: string, data: Partial<SearchQuery>): Promise<void> {
        const queryRef = ref(this.db, `${this.collection}/${id}`);
        await update(queryRef, data);
    }

    async deleteSearchQuery(id: string): Promise<void> {
        await remove(ref(this.db, `${this.collection}/${id}`));
    }



}
