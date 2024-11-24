// src/app/services/web-database.service.ts
import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { DatabaseConfig, User } from '../models/database.model';

@Injectable({
    providedIn: 'root'
})
export class WebDatabaseService {
    private db!: IDBPDatabase<any>;
    private isDbReady: boolean = false;

    constructor() {
        this.initializeDatabase();
    }

    private async initializeDatabase() {

        const dbConfig: DatabaseConfig = {
            name: 'recipe_database',
            tables: [
                {
                    name: 'users',
                    columns: {
                        id_user: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                        fullname: 'TEXT NOT NULL',
                        email: 'TEXT UNIQUE NOT NULL',
                        password: 'TEXT NOT NULL',
                        subscribed: 'BOOLEAN DEFAULT 0',
                        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                    },
                    primaryKey: 'id_user'
                },
                {
                    name: 'recipes',
                    columns: {
                        id_recipe: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                        title: 'TEXT NOT NULL',
                        image_url: 'TEXT',
                        weight: 'INTEGER',
                        time: 'INTEGER',
                        timeToResults: 'REAL',
                        preparation_time: 'DATETIME',
                        region: 'TEXT',
                        cuisine: 'TEXT',
                        id_categorie: 'INTEGER REFERENCES categories(id_categorie)',
                        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                    },
                    primaryKey: 'id_recipe'
                },
                {
                    name: 'stages',
                    columns: {
                        id_stage: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                        id_recipe: 'INTEGER NOT NULL REFERENCES recipes(id_recipe) ON DELETE CASCADE',
                        description: 'TEXT NOT NULL',
                        order_num: 'INTEGER NOT NULL',
                        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                    },
                    primaryKey: 'id_stage'
                },
                {
                    name: 'materials',
                    columns: {
                        id_material: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                        title_material: 'TEXT NOT NULL',
                        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                    },
                    primaryKey: 'id_material'
                },
                {
                    name: 'recipe_materials',
                    columns: {
                        id_recipe: 'INTEGER NOT NULL REFERENCES recipes(id_recipe) ON DELETE CASCADE',
                        id_material: 'INTEGER NOT NULL REFERENCES materials(id_material) ON DELETE CASCADE',
                        quantity: 'INTEGER',
                        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                    },
                    primaryKey: 'id_recipe, id_material'
                },
                {
                    name: 'ingredients',
                    columns: {
                        id_ingredient: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                        id_categorie: 'INTEGER NOT NULL REFERENCES categories(id_categorie)',
                        name_ingredient: 'TEXT NOT NULL',
                        weight: 'INTEGER',
                        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                    },
                    primaryKey: 'id_ingredient'
                },
                {
                    name: 'recipe_ingredients',
                    columns: {
                        id_recipe: 'INTEGER NOT NULL REFERENCES recipes(id_recipe) ON DELETE CASCADE',
                        id_ingredient: 'INTEGER NOT NULL REFERENCES ingredients(id_ingredient) ON DELETE CASCADE',
                        quantity: 'REAL NOT NULL',
                        unit: 'TEXT NOT NULL',
                        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                    },
                    primaryKey: 'id_recipe, id_ingredient'
                },
                {
                    name: 'categories',
                    columns: {
                        id_categorie: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                        name: 'TEXT NOT NULL',
                        description: 'TEXT',
                        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                    },
                    primaryKey: 'id_categorie'
                },
                {
                    name: 'favorites',
                    columns: {
                        id_recipe: 'INTEGER NOT NULL REFERENCES recipes(id_recipe) ON DELETE CASCADE',
                        id_user: 'INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE',
                        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                    },
                    primaryKey: 'id_recipe, id_user'
                },
                {
                    name: 'search_queries',
                    columns: {
                        id_search: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                        user_id: 'INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE',
                        searchQuery: 'TEXT NOT NULL',
                        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                    },
                    primaryKey: 'id_search'
                }
            ]
        };
        try {
            this.db = await openDB(dbConfig.name, 1, {
                upgrade(db) {
                    // Create tables if they don't exist
                    for (const table of dbConfig.tables) {
                        if (!db.objectStoreNames.contains(table.name)) {
                            db.createObjectStore(table.name, {
                                keyPath: table.primaryKey,
                                autoIncrement: true
                            });
                        }
                    }
                }
            });

            this.isDbReady = true;
            console.log('Web Database ready');
        } catch (error) {
            console.error('Error initializing web database:', error);
            throw error;
        }
    }


    // Generic CRUD Operations
    async add<T>(storeName: string, item: Omit<T, 'id' | 'created_at'>): Promise<T> {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);

        const newItem = {
            ...item,
            created_at: new Date().toISOString()
        };

        const id = await store.add(newItem);
        return { ...newItem, id } as T;
    }

    async getAll<T>(storeName: string): Promise<T[]> {
        const tx = this.db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        return store.getAll();
    }

    async getById<T>(storeName: string, id: number): Promise<T | undefined> {
        const tx = this.db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        return store.get(id);
    }

    async update<T>(storeName: string, id: number, data: Partial<T>): Promise<T> {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);

        const existingItem = await store.get(id);
        if (!existingItem) {
            throw new Error(`Item not found in ${storeName}`);
        }

        const updatedItem = {
            ...existingItem,
            ...data
        };

        await store.put(updatedItem);
        return updatedItem;
    }

    async delete(storeName: string, id: number): Promise<void> {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        await store.delete(id);
    }


}