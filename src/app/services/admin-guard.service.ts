import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AdminService } from './admin.service';
import { Observable } from 'rxjs';


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router,
        private adminService: AdminService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.adminService.$isAdmin.pipe(
                map(isAdmin => {
                    if (!isAdmin) {
                        this.router.navigate(['']);
                        return isAdmin;
                    }
                    return isAdmin;
                })
            );
    }
}
