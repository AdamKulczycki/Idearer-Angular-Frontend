import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private storageService: StorageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.storageService.get('access_token')) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
