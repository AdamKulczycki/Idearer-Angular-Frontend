import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService: ArticlesService, private route: ActivatedRoute,
    private storageSrv: StorageService, private authSrv: AuthService,
    private router: Router) {

    this.authSrv.isLogged.subscribe( value => {
      this.isLogged = value;
    });
  }

  currentCategory;
  currentPage = {
    page: null,
    pageSize: null,
    lastPage: null
  };
  articles: Article[] = [];
  articlesList: Article[] = [];
  sortDateReverse: boolean = false;
  sortTitleReverse: boolean = false;
  sortLikesReverse: boolean = false;
  isLogged: boolean;

  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      if ( params['category']) {
        if (params['page']) {
          this.currentPage.page = params['page'];
        } else {
          this.currentPage.page = 1;
        }
        this.currentCategory = params['category'];
        this.articleService.getArtcilesByCategory(this.currentCategory, this.currentPage.page)
          .subscribe(
            (page) => {
              this.articles = page.articles;
              this.articlesList = page.articles;
              this.currentPage.page = page.page;
              this.currentPage.pageSize = page.pageSize;
              this.currentPage.lastPage = page.lastPage;
              console.log(page);
            },
            (error) => console.log(error)
          );
      } else {
        this.currentCategory = '';
        if (params['page']) {
          this.currentPage.page = params['page'];
        } else {
          this.currentPage.page = 1;
        }
        this.articleService.getArticles(this.currentPage.page)
        .subscribe(
          (page) => {
            this.articles = page.articles;
            this.articlesList = page.articles;
            this.currentPage.page = page.page;
            this.currentPage.pageSize = page.pageSize;
            this.currentPage.lastPage = page.lastPage;
            console.log(page);
          },
          (error) => console.log(error)
        );
      }
    });
  }

  public sortByDate(reverse: boolean) {
    this.articlesList = this.articles.sort((first, second) => this.compareDate(first, second, reverse));
    this.sortDateReverse = !this.sortDateReverse;
  }

  public sortByTitle(reverse: boolean) {
    this.articlesList = this.articles.sort((first, second) => this.compareTitle(first, second, reverse));
    this.sortTitleReverse = !this.sortTitleReverse;
  }

  public sortByLikes(reverse: boolean) {
    this.articlesList = this.articles.sort((first, second) => this.compareLikes(first, second, reverse));
    this.sortLikesReverse = !this.sortLikesReverse;
  }

  public compareDate(first: Article, second: Article, reverse: boolean) {
    if (reverse) {
      return (first.created <= second.created) ? 1 : 0;
    } else {
      return (first.created > second.created) ? 1 : 0;
    }
  }

  public compareTitle(first: Article, second: Article, reverse: boolean) {
    if (reverse) {
      return (first.title <= second.title) ? 1 : 0;
    } else {
      return (first.title > second.title) ? 1 : 0;
    }
  }

  public compareLikes(first: Article, second: Article, reverse: boolean) {
    if (reverse) {
      return (first.likesCount <= second.likesCount) ? 1 : 0;
    } else {
      return (first.likesCount > second.likesCount) ? 1 : 0;
    }
  }

}
