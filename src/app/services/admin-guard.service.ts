import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, first, catchError } from 'rxjs/operators';
import { AdminService } from './admin.service';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { api } from './global-variables';
import { handleError } from '../shared/errorHandler';


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router,
        private adminService: AdminService,
        private storageService: StorageService,
        private http: HttpClient) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const id = this.storageService.get('id');
        if (id) {
            return this.http.get(api + 'users/' + id).pipe(
                map((data: any) => {
                        return data.role === 'ADMIN';
                }),
                catchError(handleError)
            );
        } else {
            this.router.navigate(['']);
            return false;
        }
    }
}
