import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute, Params } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService: ArticlesService, private route: ActivatedRoute, private storageSrv: StorageService, private authSrv: AuthService) {

    this.authSrv.isLogged.subscribe( value => {
      this.isLogged = value;
    });
  }

  articles: Article[] = [];
  articlesList: Article[] = [];
  sortDateReverse: boolean = false;
  sortTitleReverse: boolean = false;
  sortLikesReverse: boolean = false;
  category = '';
  isLogged: boolean;

  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      if ( params['category']) {
        this.category = params['category'];
        this.articleService.getArtcilesByCategory(this.category)
          .subscribe(
            (articles) => {
              this.articles = articles;
              this.articlesList = articles;
              console.log(articles);
            },
            (error) => console.log(error)
          );
      } else {
        this.articleService.getArticles()
        .subscribe(
          (articles) => {
            this.articles = articles;
            this.articlesList = articles;
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
