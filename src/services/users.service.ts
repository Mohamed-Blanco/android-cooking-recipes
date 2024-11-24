import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { User } from "../models/models";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private storeName = 'users';  // Changed to lowercase to match SQL table name

    constructor(private dbService: DatabaseService) { }

    async addUser(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
        return this.dbService.add<User>(this.storeName, user);
    }

    async getUsers(): Promise<User[]> {
        return this.dbService.getAll<User>(this.storeName);
    }

    async getUser(id: number): Promise<User | undefined> {
        return this.dbService.getById<User>(this.storeName, id);
    }

    async updateUser(id: number, data: Partial<User>): Promise<User> {
        return this.dbService.update<User>(this.storeName, id, data);
    }

    async deleteUser(id: number): Promise<void> {
        return this.dbService.delete(this.storeName, id);
    }
}