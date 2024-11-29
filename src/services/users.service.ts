import { Injectable } from '@angular/core';
import { User } from '../models/models';
import { Database, ref, get, set, update, remove } from '@angular/fire/database';
import { Auth, User as FirebaseUser } from '@angular/fire/auth'; // Import Firebase Auth
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private collection = 'users';

    constructor(private db: Database, private auth: Auth) { }  // Inject Auth service

    async addUser(user: Omit<User, 'created_at'>): Promise<void> {
        const userRef = ref(this.db, `${this.collection}/${user.id_user}`);
        await set(userRef, user);
    }

    async getUsers(): Promise<User[]> {
        const snapshot = await get(ref(this.db, this.collection));
        return snapshot.exists() ? Object.values(snapshot.val()) as User[] : [];
    }

    async getUserById(id: string): Promise<User | null> {
        const snapshot = await get(ref(this.db, `${this.collection}/${id}`));
        return snapshot.exists() ? snapshot.val() as User : null;
    }

    async updateUser(id: string, data: Partial<User>): Promise<void> {
        const userRef = ref(this.db, `${this.collection}/${id}`);
        await update(userRef, data);
    }

    async deleteUser(id: string): Promise<void> {
        await remove(ref(this.db, `${this.collection}/${id}`));
    }

    // New method to get the current authenticated user
    async getCurrentUser(): Promise<User | null> {
        const firebaseUser: FirebaseUser | null = this.auth.currentUser;
        if (firebaseUser) {
            return await this.getUserById(firebaseUser.uid); // Fetch user details from the database
        }
        return null; // No user is logged in
    }
}
