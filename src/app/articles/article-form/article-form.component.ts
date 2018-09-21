import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category-model';
import { User } from '../../models/user-model';
import { Article } from '../../models/article-model';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  @ViewChild('f') Articleform: NgForm;
  categories: Category[];
  categoryPlaceholder = -1;
  articleObject = {
    id: undefined,
    title: 'Your title',
    content: 'iuBngI-GlWU',
    created: new Date(),
    likesCount: 5,
    user: new User(1, 'admin'),
    category: undefined,
    liked: true,
    commentsCount: 0
  };
  newArticle = new Article(this.articleObject);
  onSubmit() {
    this.articleObject.title = this.Articleform.value.userData.title;
    this.articleObject.content = this.Articleform.value.userData.content;
    this.articleObject.category = this.categories[this.Articleform.value.userData.category];
    this.newArticle = new Article(this.articleObject);
    console.log(this.newArticle);
  }
  constructor(private categoriesService: CategoriesService) {
    this.categoriesService.getCategories()
      .subscribe(
        (categories) => this.categories = categories,
        (error) => console.log(error)
      );
   }

  ngOnInit() {
    this.Articleform.form.valueChanges.subscribe(x => {
      if (x.userData.title) {
        this.articleObject.title = x.userData.title;
      }
      if (this.categories && x.userData.category) {
        this.articleObject.category = this.categories[x.userData.category];
      }
      if (x.userData.content) {
        this.articleObject.content = x.userData.content;
      }
      this.newArticle = new Article(this.articleObject);
    });
  }
  /* ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  } */

}
