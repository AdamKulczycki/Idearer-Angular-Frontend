import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../services/categories.service';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private categoriesSrv: CategoriesService, private storageSrv: StorageService, private authSrv: AuthService) {

    this.authSrv.isLogged.subscribe( value => {
      this.isLogged = value;
      this.username = this.storageSrv.get('username');
    });
  }

  categories = [];
  isLogged: boolean;
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
