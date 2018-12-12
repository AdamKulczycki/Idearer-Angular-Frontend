import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService: ArticlesService, private route: ActivatedRoute, private authSrv: AuthService,
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
  currentSort;
  articles: Article[] = [];
  sortByTitle: string = "ASCENDING_TITLE";
  sortByDate: string = "DESCENDING_CREATED";
  sortByLikes: string = "DESCENDING_LIKES";
  sortTitleReverse: boolean = false;
  sortDateReverse: boolean = false;
  sortLikesReverse: boolean = false;
  isLogged: boolean;

  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      if ( params['category']) {
        this.currentSort = '';
        this.currentCategory = params['category'];

        if (params['page']) {
          this.currentPage.page = params['page'];
        } else {
          this.currentPage.page = 1;
        }

        if (params['sort']) {
          this.currentSort = params['sort'];
          this.sortArticlesByCategory(this.currentCategory, this.currentSort, this.currentPage.page);
        } else {
          this.articleService.getArtcilesByCategory(this.currentCategory, this.currentPage.page)
          .subscribe(
            (page) => {
              this.articles = page.articles;
              this.currentPage.page = page.page;
              this.currentPage.pageSize = page.pageSize;
              this.currentPage.lastPage = page.lastPage;
              console.log(page);
            },
            (error) => console.log(error)
          );
        }
      } else {
          this.currentCategory = '';
          this.currentSort = '';
          if (params['page']) {
            this.currentPage.page = params['page'];
          } else {
            this.currentPage.page = 1;
          }

          if (params['sort']) {
            this.currentSort = params['sort'];
            this.sortArticles(this.currentSort, this.currentPage.page);
          } else {
            this.articleService.getArticles(this.currentPage.page)
            .subscribe(
              (page) => {
                this.articles = page.articles;
                this.currentPage.page = page.page;
                this.currentPage.pageSize = page.pageSize;
                this.currentPage.lastPage = page.lastPage;
                console.log(page);
              },
              (error) => console.log(error)
            );
          }
        }
    });
  }

  sortArticles(sortName: string, page) {
    this.articleService.getSortArticles(sortName, page)
      .subscribe(
        (page) => {
          this.articles = page.articles;
          this.currentPage.page = page.page;
          this.currentPage.pageSize = page.pageSize;
          this.currentPage.lastPage = page.lastPage;
        },
        (error) => console.log(error)
      );
  }

  sortArticlesByCategory(categoryName: string, sortName: string, page) {
    this.articleService.getSortArticlesByCategory(categoryName, sortName, page)
      .subscribe(
        (page) => {
          this.articles = page.articles;
          this.currentPage.page = page.page;
          this.currentPage.pageSize = page.pageSize;
          this.currentPage.lastPage = page.lastPage;
        },
        (error) => console.log(error)
      );
  }

  sortArticlesWithClicking(sortName: string) {
    this.currentSort = sortName;
    
    switch (sortName) {
      case "ASCENDING_TITLE":
        this.sortByTitle = "DESCENDING_TITLE";
        this.sortTitleReverse = !this.sortTitleReverse;
        break;
      case "DESCENDING_TITLE":
        this.sortByTitle = "ASCENDING_TITLE";
        this.sortTitleReverse = !this.sortTitleReverse;
        break;
      case "ASCENDING_CREATED":
        this.sortByDate = "DESCENDING_CREATED";
        this.sortDateReverse = !this.sortDateReverse;
        break;
      case "DESCENDING_CREATED":
        this.sortByDate = "ASCENDING_CREATED";
        this.sortDateReverse = !this.sortDateReverse;
        break;
      case "ASCENDING_LIKES":
        this.sortByLikes = "DESCENDING_LIKES";
        this.sortLikesReverse = !this.sortLikesReverse;
        break;
      case "DESCENDING_LIKES":
        this.sortByLikes = "ASCENDING_LIKES";
        this.sortLikesReverse = !this.sortLikesReverse;
        break;
    }

    if (this.currentCategory) {
      this.router.navigate(['/articles'], {queryParams: {'page': 1, 'category': this.currentCategory, 'sort': this.currentSort}});
    } else {
      this.router.navigate(['/articles'], {queryParams: {'page': 1, 'sort': this.currentSort}});
    }
  }

}
