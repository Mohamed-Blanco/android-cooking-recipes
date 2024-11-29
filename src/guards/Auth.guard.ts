import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthService } from "../services/Auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean> {
        return this.authService.isAuthenticated().pipe(
            map(isAuth => {
                if (isAuth) return true;
                this.router.navigate(['/login']);
                return false;
            })
        );
    }
}