import { Component, OnInit, OnDestroy } from '@angular/core';

import { CategoriesService } from '../services/categories.service';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public categories: Category[] = [];
  public isLogged: boolean;
  public isAdministrator: boolean;
  public username: string = '';
  private isLoggedSubscription: Subscription;

  constructor(private categoriesSrv: CategoriesService,
    private storageSrv: StorageService,
    private authSrv: AuthService,
    private adminService: AdminService,
    private toastr: ToastrService) {

    this.isLoggedSubscription = this.authSrv.$isLogged.subscribe( value => {
      this.isLogged = value;
      this.username = this.storageSrv.get('username');
    });

    this.adminService.checkIfAdmin();
    this.adminService.$isAdmin.subscribe(
      response => this.isAdministrator = response
    );
  }

  ngOnInit() {
    this.getCategories();
  }
  ngOnDestroy() {
    this.isLoggedSubscription.unsubscribe();
  }
  getCategories(): void {
    this.categoriesSrv.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (err) => this.toastr.error('Server Error!')
    );
  }

  logout(): void {
    this.authSrv.logOut();
  }
}
