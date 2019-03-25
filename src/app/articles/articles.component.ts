import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute, Params, Router, NavigationEnd  } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Page } from '../models/page-model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoadingIconService } from '../services/loading-icon.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  public currentCategory: string;
  public currentPage = new Page(null);
  public currentSort: string;
  public sortByTitle: string = 'ASCENDING_TITLE';
  public sortByDate: string = 'DESCENDING_CREATED';
  public sortByLikes: string = 'DESCENDING_LIKES';
  public sortTitleReverse: boolean = false;
  public sortDateReverse: boolean = false;
  public sortLikesReverse: boolean = false;
  public isLogged: boolean;
  public isLoggedSubscription: Subscription;
  public prevRoute: string;

  constructor(private articleService: ArticlesService,
    private route: ActivatedRoute,
    private authSrv: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private isLoading: LoadingIconService) {

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.prevRoute = event.url;
    });
    // triggers when user logout from '/articles'
    this.isLoggedSubscription = this.authSrv.$isLogged.subscribe( value => {
      if (!value) {
        if (this.router.navigated && (this.router.url === '/articles' && this.prevRoute === '/')) {
          this.isLoading.setLoading(true);
          this.articleService.getArticles(1)
            .subscribe(
              (page) => {
                this.isLoading.setLoading(false);
                this.currentPage = page;
              },
              (err) => {
                this.isLoading.setLoading(false);
                this.toastr.error('Server Error!');
              }
            );
        }
      }
      this.isLogged = value;
    });
  }


  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      this.isLoading.setLoading(true);
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
              this.isLoading.setLoading(false);
              this.currentPage = page;
            },
            (err) => {
              this.isLoading.setLoading(false);
              this.toastr.error('Server Error!');
            }
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
                this.isLoading.setLoading(false);
                this.currentPage = page;
              },
              (err) => {
                this.isLoading.setLoading(false);
                this.toastr.error('Server Error!');
              }
            );
          }
        }
    });
  }
  ngOnDestroy(): void {
    this.isLoggedSubscription.unsubscribe();
  }
  sortArticles(sortName: string, pageNumber: number) {
    this.articleService.getSortArticles(sortName, pageNumber)
      .subscribe(
        (page) => {
          this.isLoading.setLoading(false);
          this.currentPage = page;
        },
        (err) => {
          this.isLoading.setLoading(false);
          this.toastr.error('Server Error!');
        }
      );
  }

  sortArticlesByCategory(categoryName: string, sortName: string, pageNumber: number) {
    this.articleService.getSortArticlesByCategory(categoryName, sortName, pageNumber)
      .subscribe(
        (page) => {
          this.isLoading.setLoading(false);
          this.currentPage = page;
        },
        (err) => {
          this.isLoading.setLoading(false);
          this.toastr.error('Server Error!');
        }
      );
  }

  sortArticlesWithClicking(sortName: string) {
    this.currentSort = sortName;

    switch (sortName) {
      case 'ASCENDING_TITLE':
        this.sortByTitle = 'DESCENDING_TITLE';
        this.sortTitleReverse = !this.sortTitleReverse;
        break;
      case 'DESCENDING_TITLE':
        this.sortByTitle = 'ASCENDING_TITLE';
        this.sortTitleReverse = !this.sortTitleReverse;
        break;
      case 'ASCENDING_CREATED':
        this.sortByDate = 'DESCENDING_CREATED';
        this.sortDateReverse = !this.sortDateReverse;
        break;
      case 'DESCENDING_CREATED':
        this.sortByDate = 'ASCENDING_CREATED';
        this.sortDateReverse = !this.sortDateReverse;
        break;
      case 'ASCENDING_LIKES':
        this.sortByLikes = 'DESCENDING_LIKES';
        this.sortLikesReverse = !this.sortLikesReverse;
        break;
      case 'DESCENDING_LIKES':
        this.sortByLikes = 'ASCENDING_LIKES';
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
