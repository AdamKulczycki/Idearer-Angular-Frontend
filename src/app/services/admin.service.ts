import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { api } from './global-variables';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AdminService {

    public $isAdmin = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient, private storageService: StorageService) {}
    checkIfAdmin(): void {
        const id = this.storageService.get('id');
        if (id) {
            this.http.get(api + 'users/' + id).subscribe(
                (data: any) => {
                    const isAdmin = data.role  === 'ADMIN';
                    this.setIsAdmin(isAdmin);
                }
            );
        } else {
            this.setIsAdmin(false);
        }

    }

    public setIsAdmin(value: boolean): void {
        this.$isAdmin.next(value);
      }
}
