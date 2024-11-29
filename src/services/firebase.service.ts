// firebase-crud.service.ts
import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ref, set, get, update, remove, equalTo, getDatabase, limitToFirst, orderByChild, query, DatabaseReference } from 'firebase/database';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirebaseCrudService {
    constructor(private db: AngularFireDatabase) { }

    // Add a new document to the specified collection
    async add<T>(collection: string, data: T): Promise<void> {
        const ref = this.db.list(collection);
        await ref.push({ ...data, created_at: new Date().toISOString() });
    }

    // Get all documents from a collection
    getAll<T>(collection: string): Observable<T[]> {
        return this.db.list<T>(collection).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ id: c.payload.key, ...c.payload.val() as T }))
            )
        );
    }

    // Get a single document by ID
    getById<T>(collection: string, id: string): Observable<T | null> {
        return this.db.object<T>(`${collection}/${id}`).valueChanges();
    }

    // Update a document by ID
    async update<T>(collection: string, id: string, data: Partial<T>): Promise<void> {
        await this.db.object(`${collection}/${id}`).update({ ...data, last_updated: new Date().toISOString() });
    }

    // Delete a document by ID
    async delete(collection: string, id: string): Promise<void> {
        await this.db.object(`${collection}/${id}`).remove();
    }

    // Write data to a specified path
    writeData(path: string, data: any): Observable<void> {
        const dbRef = ref(this.db.database, path);
        return from(set(dbRef, data));
    }

    // Read data from a specified path
    readData<T>(path: string, p0: { orderByChild: string; equalTo: string; }): Observable<T | null> {
        const dbRef = ref(this.db.database, path);
        return from(get(dbRef)).pipe(
            map(snapshot => (snapshot.exists() ? snapshot.val() as T : null))
        );
    }

    // Update data at a specified path
    updateData(path: string, data: any): Observable<void> {
        const dbRef = ref(this.db.database, path);
        return from(update(dbRef, data));
    }

    // Delete data at a specified path
    deleteData(path: string): Observable<void> {
        const dbRef = ref(this.db.database, path);
        return from(remove(dbRef));
    }

    // Retrieve a list of data (for paths with multiple child nodes)
    readListData<T>(path: string): Observable<T[]> {
        const dbRef = ref(this.db.database, path);
        return from(get(dbRef)).pipe(
            map(snapshot => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    return Object.values(data) as T[];
                }
                return [];
            })
        );
    }


}
