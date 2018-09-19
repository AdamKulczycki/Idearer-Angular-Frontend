import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private categoriesSrv: CategoriesService) { }

  categories = [];

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
}
