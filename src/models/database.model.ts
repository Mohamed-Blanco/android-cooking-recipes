// src/app/models/database.model.ts
export interface DatabaseTable {
    name: string;
    columns: {
        [key: string]: string;  // column name: data type
    };
    primaryKey: string;
}

export interface DatabaseConfig {
    name: string;
    tables: DatabaseTable[];
}

export interface User {
    id?: number;
    name: string;
    email: string;
    created_at?: string;
}