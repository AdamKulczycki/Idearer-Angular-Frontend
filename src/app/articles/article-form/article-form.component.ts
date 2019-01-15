import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category-model';
import { User } from '../../models/user-model';
import { Article } from '../../models/article-model';
import { ArticlesService } from '../../services/articles.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  constructor(private categoriesService: CategoriesService,
    private articlesService: ArticlesService,
    private storageService: StorageService) {

    this.categoriesService.getCategories()
      .subscribe(
        (categories) => this.categories = categories,
        (error) => console.log(error)
      );
   }
  @ViewChild('f') Articleform: NgForm;
  categories: Category[];
  categoryPlaceholder = -1;
  URL_content_REGEX = new RegExp('^[\s\S]*watch\?v=([\s\S]*)$');
  username = this.storageService.get('username');

  articleObject = {
    id: undefined,
    title: 'Your title',
    content: 'HetU8BJg_Cg',
    created: new Date(),
    likesCount: 0,
    user: new User({
      email: undefined,
      id: undefined,
      password: undefined,
      username: this.username
    }),
    category: undefined,
    liked: true,
    commentsCount: 0
  };
  newArticle = new Article(this.articleObject);
  onSubmit() {
    this.articleObject.title = this.Articleform.value.userData.title;
    if ((this.Articleform.value.userData.content).match(/^[\s\S]*watch\?v=([\s\S]{11})$/)[1]) {
      this.articleObject.content = this.Articleform.value.userData.content.match(/^[\s\S]*watch\?v=([\s\S]{11})$/)[1];
    }
    this.articleObject.category = this.categories[this.Articleform.value.userData.category];
    this.newArticle = new Article(this.articleObject);
    console.log(this.newArticle);
    this.articlesService.makeArticle(this.newArticle)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
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
        if (x.userData.content.match(/^[\s\S]*watch\?v=([\s\S]{11})$/)) {
          this.articleObject.content = x.userData.content.match(/^[\s\S]*watch\?v=([\s\S]{11})$/)[1];
        }
      }
      this.newArticle = new Article(this.articleObject);
    });
  }
  /* ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  } */

}
