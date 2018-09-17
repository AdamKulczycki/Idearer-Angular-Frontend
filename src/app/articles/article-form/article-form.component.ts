import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category-model';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  @ViewChild('f') signupForm: NgForm;
  categories: Category[];
  article = {
    title: '',
    content: '',
    category: ''
  };

  onSubmit() {
    this.article.title = this.signupForm.value.userData.title;
    this.article.content = this.signupForm.value.userData.content;
    this.article.category = this.signupForm.value.userData.category;
    console.log(this.article);
  }
  constructor(private categoriesService: CategoriesService) {
    this.categoriesService.getCategories()
      .subscribe(
        (categories) => this.categories = categories,
        (error) => console.log(error)
      );
   }

  ngOnInit() {
  }

}
