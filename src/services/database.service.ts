import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { WebDatabaseService } from './web-database.service';

interface TableConfig {
    name: string;
    columns: {
        [key: string]: string;
    };
    primaryKey: string;
}

interface DatabaseConfig {
    name: string;
    tables: TableConfig[];
}

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private nativeDatabase?: SQLiteObject;
    private webDatabase: WebDatabaseService;
    private isDbReady: boolean = false;
    private dbConfig: DatabaseConfig = {
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

    constructor(
        private sqlite: SQLite,
        webDatabase: WebDatabaseService
    ) {
        this.webDatabase = webDatabase;
        this.initializeDatabase();
    }

    private async initializeDatabase() {
        if (Capacitor.isNative) {
            try {
                this.nativeDatabase = await this.sqlite.create({
                    name: `${this.dbConfig.name}.db`,
                    location: 'default'
                });
                await this.createNativeTables();
            } catch (error) {
                console.error('Error initializing native database:', error);
                throw error;
            }
        }
        this.isDbReady = true;
    }

    private async createNativeTables() {
        if (!this.nativeDatabase) return;

        for (const table of this.dbConfig.tables) {
            const columnDefinitions = Object.entries(table.columns)
                .map(([name, type]) => `${name} ${type}`)
                .join(', ');

            const sql = `CREATE TABLE IF NOT EXISTS ${table.name} (${columnDefinitions})`;
            await this.nativeDatabase.executeSql(sql, []);
        }
    }

    // Generic CRUD Operations
    async add<T>(
        tableName: string,
        data: Omit<T, 'id' | 'created_at'>
    ): Promise<T> {
        const table = this.dbConfig.tables.find(t => t.name === tableName);
        if (!table) throw new Error(`Table ${tableName} not found`);

        if (this.nativeDatabase) {
            const columns = Object.keys(data);
            const values = Object.values(data);
            const placeholders = new Array(values.length).fill('?').join(', ');

            const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
            const result = await this.nativeDatabase.executeSql(sql, values);

            return {
                ...data,
                id: result.insertId,
                created_at: new Date().toISOString()
            } as T;
        } else {
            return this.webDatabase.add<T>(tableName, data);
        }
    }

    async getAll<T>(tableName: string): Promise<T[]> {
        if (this.nativeDatabase) {
            const result = await this.nativeDatabase.executeSql(`SELECT * FROM ${tableName}`, []);
            const items: T[] = [];
            for (let i = 0; i < result.rows.length; i++) {
                items.push(result.rows.item(i));
            }
            return items;
        } else {
            return this.webDatabase.getAll<T>(tableName);
        }
    }

    async getById<T>(tableName: string, id: number): Promise<T | undefined> {
        if (this.nativeDatabase) {
            const result = await this.nativeDatabase.executeSql(
                `SELECT * FROM ${tableName} WHERE id = ?`,
                [id]
            );
            return result.rows.length > 0 ? result.rows.item(0) : undefined;
        } else {
            return this.webDatabase.getById<T>(tableName, id);
        }
    }

    async update<T>(
        tableName: string,
        id: number,
        data: Partial<T>
    ): Promise<T> {
        if (this.nativeDatabase) {
            const setClause = Object.keys(data)
                .map(key => `${key} = ?`)
                .join(', ');
            const values = [...Object.values(data), id];

            await this.nativeDatabase.executeSql(
                `UPDATE ${tableName} SET ${setClause} WHERE id = ?`,
                values
            );

            const updated = await this.getById<T>(tableName, id);
            if (!updated) {
                throw new Error(`Item not found in ${tableName}`);
            }
            return updated;
        } else {
            return this.webDatabase.update<T>(tableName, id, data);
        }
    }

    async delete(tableName: string, id: number): Promise<void> {
        if (this.nativeDatabase) {
            await this.nativeDatabase.executeSql(
                `DELETE FROM ${tableName} WHERE id = ?`,
                [id]
            );
        } else {
            await this.webDatabase.delete(tableName, id);
        }
    }

    // Helper methods for custom queries if needed
    async executeNativeQuery<T>(sql: string, params: any[] = []): Promise<T[]> {
        if (!this.nativeDatabase) {
            throw new Error('Native database not available');
        }
        const result = await this.nativeDatabase.executeSql(sql, params);
        const items: T[] = [];
        for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i));
        }
        return items;
    }
}