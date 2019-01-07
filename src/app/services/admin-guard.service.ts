import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { api } from './global-variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { AdminService } from './admin.service';


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router, private storageService: StorageService,
        private http: HttpClient, private adminService: AdminService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.adminService.$isAdmin.pipe(
                map(isAdmin => {
                    if (!isAdmin) {
                        this.router.navigate(['']);
                    }
                    return isAdmin;
                })
            );
    }
}
