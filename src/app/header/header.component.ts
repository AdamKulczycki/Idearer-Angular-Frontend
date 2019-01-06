import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../services/categories.service';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private categoriesSrv: CategoriesService,
    private storageSrv: StorageService, private authSrv: AuthService,
    private adminService: AdminService) {

    this.authSrv.isLogged.subscribe( value => {
      this.isLogged = value;
      this.username = this.storageSrv.get('username');
    });

    this.adminService.checkIfAdmin();
    this.adminService.$isAdmin.subscribe(
      response => this.isAdministrator = response
    );
    // this.isAdmin.checkIfAdmin().subscribe(
    //   res => {
    //     this.isAdministrator = res;
    //     console.log(res);
    //   },
    //   err => console.log(err)
    // );
  }

  categories = [];
  isLogged: boolean;
  isAdministrator: boolean;
  username = '';

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoriesSrv.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
  }

  logout() {
    this.authSrv.logOut();
  }
}
