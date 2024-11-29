import { Injectable } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    User,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    authState
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FirebaseCrudService } from './firebase.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private auth: Auth,
        private firebaseService: FirebaseCrudService  // Ensure FirebaseService is properly defined
    ) { }

    // Register a new user with email and password
    register(email: string, password: string, fullname: string): Observable<User | null> {
        return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
            map(userCredential => {
                const user = userCredential.user;
                if (user) {
                    this.firebaseService.writeData(`users/${user.uid}`, {
                        email: user.email,
                        fullname: fullname,
                        createdAt: new Date().toISOString()
                    });
                }
                return user;
            }),
            catchError(error => {
                console.error('Registration error:', error.message);
                throw error;
            })
        );
    }

    // Login with email and password
    login(email: string, password: string): Observable<User | null> {
        return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
            map(userCredential => userCredential.user),
            catchError(error => {
                console.error('Login error:', error.message);
                throw error;
            })
        );
    }

    // Google Sign-In
    signInWithGoogle(): Observable<User | null> {
        const provider = new GoogleAuthProvider();
        return from(signInWithPopup(this.auth, provider)).pipe(
            map(userCredential => {
                const user = userCredential.user;
                if (user) {
                    this.firebaseService.writeData(`users/${user.uid}`, {
                        email: user.email,
                        displayName: user.displayName,
                        createdAt: new Date().toISOString()
                    });
                }
                return user;
            }),
            catchError(error => {
                console.error('Google Sign-In error:', error.message);
                throw error;
            })
        );
    }

    // Password Reset
    resetPassword(email: string): Observable<void> {
        return from(sendPasswordResetEmail(this.auth, email)).pipe(
            catchError(error => {
                console.error('Password reset error:', error.message);
                throw error;
            })
        );
    }

    // Logout
    logout(): Observable<void> {
        return from(signOut(this.auth)).pipe(
            catchError(error => {
                console.error('Logout error:', error.message);
                throw error;
            })
        );
    }

    // Get Current User (Reactive)
    getCurrentUser(): Observable<User | null> {
        return authState(this.auth);
    }

    // Check if user is authenticated (Reactive)
    isAuthenticated(): Observable<boolean> {
        return authState(this.auth).pipe(
            map(user => !!user)
        );
    }
}
