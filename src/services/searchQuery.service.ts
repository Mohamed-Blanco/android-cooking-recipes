// search-query.service.ts
import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { SearchQuery } from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class SearchQueryService {
    private storeName = 'search_queries';

    constructor(private dbService: DatabaseService) { }

    async addSearchQuery(searchQuery: Omit<SearchQuery, 'id_search' | 'created_at'>): Promise<SearchQuery> {
        return this.dbService.add<SearchQuery>(this.storeName, searchQuery);
    }

    async getSearchQueries(): Promise<SearchQuery[]> {
        return this.dbService.getAll<SearchQuery>(this.storeName);
    }

    async getSearchQueriesByUser(userId: number): Promise<SearchQuery[]> {
        return this.dbService.executeNativeQuery<SearchQuery>(
            'SELECT * FROM search_queries WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
    }

    async deleteSearchQuery(id: number): Promise<void> {
        return this.dbService.delete(this.storeName, id);
    }

    async clearUserSearchHistory(userId: number): Promise<void> {
        await this.dbService.executeNativeQuery(
            'DELETE FROM search_queries WHERE user_id = ?',
            [userId]
        );
    }
}